'use client'

import { PopTypeAdmin } from '@/shared/types/typePop'
import { toast } from 'sonner'
import { PopoverItem } from '../PopItem'
import { usePopover } from '../PopHook'

export const EditAdmin = ({ data }: { data: Extract<PopTypeAdmin, { type: 'editAdmin' }> }) => {
	const { closePop } = usePopover()

	const handleSaveAdmin = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const toastId = toast.loading('Saving...')

		const formData = new FormData(e.currentTarget)

		const username =
			formData.get('username') !== data.data.username
				? formData.get('username')
				: null
		const password = formData.get('password')
			? formData.get('password')
			: null
		const role =
			formData.get('role') !== data.data.role
				? formData.get('role')
				: null
		const blocked =
			formData.get('blocked') !== data.data.blocked.toString()
				? formData.get('blocked') === 'true'
				: null

		if (!username && !password && !role && !blocked) {
			toast.error('No changes made', { id: toastId })
			return
		}

		try {
			const bodyData = {
				username,
				password,
				role,
				blocked
			}

			const body = Object.fromEntries(
				Object.entries(bodyData).filter(([, value]) => value !== null)
			)

			if (Object.keys(body).length === 0) return

			const res = await fetch(`/api/admin/${data.data.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})

			if (res.ok) {
				toast.success('User updated successfully', { id: toastId })
				console.log('User updated successfully')
			} else {
				toast.error('Failed to update user', { id: toastId })
				console.error('Failed to update user: ', res.statusText)
			}
		} catch (error) {
			console.error('Error updating user:', error)
			toast.error('Error updating user', { id: toastId })
		}
	}

	const handleDeleteAdmin = async () => {
		const toastId = toast.loading('Deleting...')

		try {
			const res = await fetch(`/api/admin/${data.data.id}`, {
				method: 'DELETE'
			})

			if (res.ok) {
				toast.success('User deleted successfully', { id: toastId })
				console.log('User deleted successfully')
			} else {
				toast.error('Failed to delete user', { id: toastId })
				console.error('Failed to delete user: ', res.statusText)
			}
		} catch (error) {
			console.error('Error deleting user:', error)
			toast.error('Error deleting user', { id: toastId })
		} finally {
			closePop()
		}
	}

	return (
		<div className="p-5 h-full flex flex-col gap-5">
			<h2 className="text-2xl font-bold text-center">
				{data.data.username}
			</h2>

			<form
				className="flex flex-col gap-5 h-full"
				onSubmit={handleSaveAdmin}
			>
				<ul className="list-none p-0 m-0">
					<PopoverItem
						label="ID"
						disabled
						value={data.data.id}
					/>
					<PopoverItem
						label="Username"
						value={data.data.username}
					/>
					<PopoverItem
						label="Password"
						type="password"
						value={''}
					/>
					<PopoverItem
						label="Role"
						value={data.data.role}
					/>
					<PopoverItem
						label="Blocked"
						type="select"
						value={String(data.data.blocked)}
						options={['true', 'false']}
					/>
					<PopoverItem
						label="Created At"
						disabled
						value={new Date(data.data.created_at).toLocaleString()}
					/>
				</ul>

				<div className="flex items-center justify-center mt-auto">
					<button
						type="submit"
						className="w-1/2 py-2 bg-primary text-bg rounded-l hover:w-full hover:rounded-l-lg hover:tracking-widest transition-all duration-200 cursor-pointer font-semibold text-md"
					>
						Save changes
					</button>
					<button
						type="button"
						className="w-1/2 py-2 bg-red-500 text-bg rounded-r hover:w-full hover:rounded-r-lg hover:tracking-widest transition-all duration-200 cursor-pointer font-semibold text-md"
						onClick={() => handleDeleteAdmin()}
					>
						Delete user
					</button>
				</div>
			</form>
		</div>
	)
}
