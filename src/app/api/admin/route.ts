import { supabase } from '@/lib/adminDB';
import { NextResponse } from 'next/server';
import argon2 from 'argon2';
import "server-only";

export async function GET() {
	const { data, error } = await supabase.from('admins')
		.select('id, username, role, blocked, created_at')
		.order('created_at', { ascending: true })

	if (error) {
		console.error('Error fetching admin users:', error);
	}

	return NextResponse.json({
		success: !error,
		data: error ? error.message : data,
	});
}

export async function POST(request: Request) {
	const { username, password, role } = await request.json()

	if (!username || !password || !role) {
		return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
	}

	const hashedPassword = await argon2.hash(password)

	const { data, error } = await supabase.from('admins').insert({
		username,
		password: hashedPassword,
		role
	}).select('id')

	if (error) {
		console.error('Error creating admin user:', error)
		return NextResponse.json({ success: false, message: error.message }, { status: 500 })
	}

	return NextResponse.json({ success: true, data })
}