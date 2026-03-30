import { supabase } from '@/lib/adminDB'
import { createToken } from '@/lib/auth'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import argon2 from 'argon2'
import { NextRequest, NextResponse } from 'next/server'
import 'server-only'

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

const loginRatelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(5, '10 m'),
	analytics: true,
	prefix: 'ratelimit:login'
})

export async function POST(req: NextRequest) {
	const ip =
		req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
		req.headers.get('x-real-ip') ||
		req.headers.get('cf-connecting-ip') ||
		req.headers.get('x-vercel-forwarded-for') ||
		'anonymous'

	const { success, limit, remaining, reset } = await loginRatelimit.limit(ip)

	if (!success) {
		return NextResponse.json(
			{
				success: false,
				data: 'Слишком много попыток входа. Попробуйте позже.'
			},
			{
				status: 429,
				headers: {
					'X-RateLimit-Limit': limit.toString(),
					'X-RateLimit-Remaining': remaining.toString(),
					'X-RateLimit-Reset': reset.toString()
				}
			}
		)
	}

	try {
		const { username, password } = await req.json()

		const { data } = await supabase
			.from('admins')
			.select('*')
			.eq('username', username)
			.single()

		if (!data) {
			return NextResponse.json(
				{ success: false, data: 'User not found' },
				{ status: 400 }
			)
		}

		const isPasswordValid = await argon2.verify(data.password, password)

		if (!isPasswordValid) {
			return NextResponse.json(
				{ success: false, data: 'Invalid password' },
				{ status: 400 }
			)
		}

		// Generate JWT token
		const token = await createToken({
			id: data.id,
			username: data.username,
			role: data.role,
			blocked: data.blocked,
			createdAt: data.created_at
		})

		const res = NextResponse.json({ success: true })

		res.cookies.set({
			name: 'token',
			value: token,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 5 // 5h
		})

		return res
	} catch (error) {
		return NextResponse.json(
			{ success: false, data: (error as Error).message },
			{ status: 400 }
		)
	}
}
