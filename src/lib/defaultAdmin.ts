import { DEFAULT_ADMIN } from '@/config/admin.config'
import argon2 from 'argon2'
import 'server-only'
import { prisma } from './database'

export const CREATE_DEFAULT_ADMIN = async () => {
	const hashedPassword = await argon2.hash(DEFAULT_ADMIN.password)
	const newAdmin = await prisma.admin.create({
		data: {
			username: DEFAULT_ADMIN.username,
			password: hashedPassword,
			role: 'admin'
		}
	})

	return newAdmin
}

export const CHECK_DEFAULT_ADMIN = async () => {
	// Check if an admin already exists
	const existingAdmin = await prisma.admin.findFirst()
	if (existingAdmin) {
		return
	}

	// If no admin exists, create the default admin
	CREATE_DEFAULT_ADMIN()

	console.log('Default admin created')
}
