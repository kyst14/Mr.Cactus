import { CHECK_DEFAULT_ADMIN } from '@/lib/defaultAdmin'
import 'server-only'

export async function register() {
	console.log('🔎 Checking default admin...')

	try {
		await CHECK_DEFAULT_ADMIN()
		console.log('✅ Default admin check completed')
	} catch (error) {
		console.error('❌ Error during default admin check:', error)
	}
}
