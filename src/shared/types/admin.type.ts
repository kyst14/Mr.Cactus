import { UUID } from 'crypto'

export type AdminUser = {
	id: number
	username: string
	role: string
	blocked: boolean
	createdAt: Date | string
}