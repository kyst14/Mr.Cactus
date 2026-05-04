import { createToken } from '@/lib/auth'
import { prisma } from '@/lib/database'
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

	// if (!success) {
	// 	return NextResponse.json(
	// 		{
	// 			success: false,
	// 			data: 'Слишком много попыток входа. Попробуйте позже.'
	// 		},
	// 		{
	// 			status: 429,
	// 			headers: {
	// 				'X-RateLimit-Limit': limit.toString(),
	// 				'X-RateLimit-Remaining': remaining.toString(),
	// 				'X-RateLimit-Reset': reset.toString()
	// 			}
	// 		}
	// 	)
	// }

	try {
		const { username, password } = await req.json()

		const admin = await prisma.admin.findUnique({
			where: { username }
		})

		if (!admin) {
			return NextResponse.json(
				{ success: false, data: 'Invalid username or password.' },
				{ status: 400 }
			)
		}

		const isPasswordValid = await argon2.verify(admin.password, password)

		if (!isPasswordValid) {
			return NextResponse.json(
				{ success: false, data: 'Invalid username or password.' },
				{ status: 400 }
			)
		}

		// Generate JWT token
		const token = await createToken({
			id: admin.id,
			username: admin.username,
			role: admin.role,
			blocked: admin.blocked,
			createdAt: admin.createdAt
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
		console.error('Login error:', error)

		return NextResponse.json(
			{ success: false, data: 'Something went wrong' },
			{ status: 400 }
		)
	}
}
