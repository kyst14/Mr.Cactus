import { prisma } from '@/lib/database'
import argon2 from 'argon2'
import { NextResponse } from 'next/server'
import 'server-only'

export async function GET() {
	const admins = await prisma.admin.findMany()
	return NextResponse.json({ success: true, data: admins })
}

export async function POST(request: Request) {
	const { username, password } = await request.json()

	if (!username || !password) {
		return NextResponse.json(
			{ success: false, message: 'Username and password are required' },
			{ status: 400 }
		)
	}

	try {
		const hashedPassword = await argon2.hash(password)
		const newAdmin = await prisma.admin.create({
			data: {
				username,
				password: hashedPassword,
				role: 'admin'
			}
		})
		return NextResponse.json(
			{ success: true, data: newAdmin },
			{ status: 201 }
		)
	} catch (error) {
		console.error('Error creating admin:', error)
		return NextResponse.json(
			{ success: false, message: 'Failed to create admin' },
			{ status: 500 }
		)
	}
}
