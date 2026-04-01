import { verifyToken } from '@/lib/auth'
import { ConfigType } from '@/shared/types/proxy.type'
import { NextRequest, NextResponse } from 'next/server'

export const configAdmin: ConfigType = [
	{
		path: ['/admin/*', '/api/admin/*'],
		excludes: '/admin/logout',
		method: '*',
		action: handleAdmin
	}
]

const handleError = (baseUrl: string, redirect = true) => {
	if (redirect) {
		return NextResponse.redirect(new URL('/admin/login', baseUrl || 'http://localhost:3000'), { status: 302 })
	} else {
		return NextResponse.json({ success: false, data: 'Unauthorized' }, { status: 403 })
	}
}

async function handleAdmin(request: NextRequest) {
	const baseUrl = request.nextUrl.origin
	// === Extract token ===
	// Variant A: from cookie
	let token = request.cookies.get('token')?.value

	// Variant B: from header (Bearer token)
	if (!token) {
		token = request.headers.get('authorization')?.split('Bearer ')[1]
	}

	// === Check token, if login page then skip ===
	if (!token && request.nextUrl.pathname !== '/admin/login') {
		return handleError(baseUrl)
	} else if (!token) {
		return NextResponse.next()
	} else if (request.nextUrl.pathname === '/admin/login') {
		return NextResponse.redirect(new URL('/admin', request.url), { status: 302 })
	}

	try {
		// Check JWT (signature + expiration)
		const payload = await verifyToken(token)

		// === Check role ===
		if (!payload || payload?.role !== 'admin') {
			return handleError("", false)
		}

		return NextResponse.next()
	} catch (error) {
		console.error('JWT verification failed:', error)
		return handleError(baseUrl)
	}
}
