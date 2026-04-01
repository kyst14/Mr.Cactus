import { DEFAULT_ADMIN } from '@/config/admin.config'
import argon2 from 'argon2'
import { supabase } from './adminDB'
import "server-only"

export const CREATE_DEFAULT_ADMIN = async () => {
	const { data, error } = await supabase.from('admins').insert([
		{
			username: DEFAULT_ADMIN.username,
			password: await argon2.hash(DEFAULT_ADMIN.password),
			role: 'admin',
		}
	])
	if (error) {
		console.error(error)
		return null
	}
	return data
}

export const CHECK_DEFAULT_ADMIN = async () => {
	const { data, error } = await supabase.from('admins').select('*')

	if (error) {
		throw new Error(error.message)
	}
	if (!data || data.length === 0) {
		await CREATE_DEFAULT_ADMIN()
	}
	console.log('Default admin created')
}
