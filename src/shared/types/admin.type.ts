import { UUID } from 'crypto'

export type AdminUser = {
	id: UUID
	username: string
	role: string
	blocked: boolean
	created_at: string
}