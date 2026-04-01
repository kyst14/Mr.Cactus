import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/adminDB'
import argon2 from 'argon2'
import 'server-only'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params
	const { data, error } = await supabase
		.from('admins')
		.select()
		.eq('id', id)
		.single()

	if (error) {
		return NextResponse.json(
			{ success: false, data: error.message },
			{ status: 400 }
		)
	}

	return NextResponse.json({ success: true, data })
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
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

	const { data: admin, error } = await supabase
		.from('admins')
		.update(data)
		.eq('id', id)
		.select()
		.single()

	if (error) {
		return NextResponse.json(
			{ success: false, data: error.message },
			{ status: 400 }
		)
	}

	return NextResponse.json({ success: true, data: admin })
}