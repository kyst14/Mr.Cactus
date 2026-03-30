import 'server-only'
import { supabase } from '@/lib/adminDB'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params

	const { data } = await supabase
		.from('products')
		.select('*')
		.eq('id', id)
		.single()

	if (!data || data.length === 0) {
		return NextResponse.json(
			{ success: false, data: 'Product not found' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ success: true, data })
}

// === Only admin ===
export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params

	const { statusText, error } = await supabase
		.from('products')
		.delete()
		.eq('id', id)

	if (error) {
		return NextResponse.json(
			{ success: false, data: error.message },
			{ status: 400 }
		)
	}

	return NextResponse.json({ success: true, data: statusText })
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	const { name, description, price } = await req.json()

	const { statusText, error } = await supabase
		.from('products')
		.update({ name, description, price })
		.eq('id', id)
		.select()
		.single()

	if (error) {
		return NextResponse.json(
			{ success: false, data: error.message },
			{ status: 400 }
		)
	}

	return NextResponse.json({ success: true, data: statusText })
}
