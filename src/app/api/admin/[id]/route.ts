import { prisma } from '@/lib/database'
import argon2 from 'argon2'
import { NextRequest, NextResponse } from 'next/server'
import 'server-only'

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	const data = await prisma.admin.findUnique({
		where: { id: parseInt(id) }
	})

	if (!data) {
		return NextResponse.json(
			{ success: false, data: 'Admin not found' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ success: true, data })
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	const data = await request.json()

	if (!data) {
		return NextResponse.json(
			{ success: false, data: 'No data provided' },
			{ status: 400 }
		)
	}

	if (data.password) {
		data.password = await argon2.hash(data.password)
	}

	const admin = await prisma.admin.update({
		where: { id: parseInt(id) },
		data
	})

	if (!admin) {
		return NextResponse.json(
			{ success: false, data: 'Admin not found' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ success: true, data: admin })
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params

	await prisma.admin.delete({
		where: { id: parseInt(id) }
	})

	return NextResponse.json({ success: true, data: 'Admin deleted' })
}
