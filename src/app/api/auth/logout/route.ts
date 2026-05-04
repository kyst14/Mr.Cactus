import { NextResponse } from 'next/server'

export async function POST() {
	// Clear the token cookie
	const response = NextResponse.json({
		success: true,
		data: 'Logged out successfully'
	})

	response.cookies.delete('token')

	return response
}
