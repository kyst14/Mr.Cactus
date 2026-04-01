import { AdminUser } from '@/shared/types/admin.type'

export const handleUpdateAdmin = async (
	adminId: string,
	data: Partial<AdminUser>
) => {
	try {
		const res = await fetch(`/api/admin/${adminId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		if (res.ok) {
			const updatedAdmin = await res.json()
			return updatedAdmin
		} else {
			const errorData = await res.json()
			console.error('Failed to update admin:', errorData)
		}
	} catch (error) {
		console.error('Error updating admin:', error)
	}
}

export const handleAddAdmin = async (data: Partial<AdminUser>) => {
	try {
		const res = await fetch('/api/admin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		if (res.ok) {
			const newAdmin = await res.json()
			return newAdmin
		} else {
			const errorData = await res.json()
			console.error('Failed to add admin:', errorData)
		}
	} catch (error) {
		console.error('Error adding admin:', error)
	}
}