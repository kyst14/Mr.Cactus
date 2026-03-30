import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import 'server-only'

const JWT_SECRET = new TextEncoder().encode(
	process.env.JWT_SECRET!
)

export interface SessionPayload extends JWTPayload {
	id: string
	userName?: string
	role?: string
	blocked?: boolean
	createdAt?: number
}

export async function createToken(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('5h')
		.sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
	try {
		const { payload } = await jwtVerify(token, JWT_SECRET, {
			algorithms: ['HS256']
		})
		return payload as SessionPayload
	} catch {
		return null
	}
}
