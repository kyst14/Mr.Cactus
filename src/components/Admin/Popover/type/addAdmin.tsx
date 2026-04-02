import { PopTypeAdmin } from '@/shared/types/typePop'
import { toast } from 'sonner'
import { PopoverItem } from '../PopItem'
import { usePopover } from '../PopHook'

export const AddAdmin = ({
	data
}: {
	data: Extract<PopTypeAdmin, { type: 'addAdmin' }>
}) => {
	const { closePop } = usePopover()
	const handleAddAdmin = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const toastId = toast.loading('Adding admin...')

		const formData = new FormData(e.currentTarget)

		const username = formData.get('username')
		const password = formData.get('password')
		const role = formData.get('role')

		if (!username || !password || !role) {
			toast.error('Missing required fields', { id: toastId })
			return
		}

		try {
			const res = await fetch(`/api/admin`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username,
					password,
					role
				})
			})

			if (res.ok) {
				toast.success('Admin added successfully', { id: toastId })
			} else {
				toast.error('Error adding admin', { id: toastId })
			}
		} catch (error) {
			console.error('Error adding admin:', error)
			toast.error('Error adding admin', { id: toastId })
		} finally {
			closePop()
		}
	}
	return (
		<div className="p-5 h-full flex flex-col gap-5">
			<h2 className="text-2xl font-bold text-center">Add Admin</h2>

			<form
				className="flex flex-col gap-5 h-full"
				onSubmit={handleAddAdmin}
			>
				<ul className="list-none p-0 m-0">
					<PopoverItem
						label="Username"
						value={data.data?.username}
					/>
					<PopoverItem
						label="Password"
						type="password"
						value={''}
					/>
					<PopoverItem
						label="Role"
						value={data.data?.role}
					/>
				</ul>

				<div className="flex items-center justify-center mt-auto">
					<button
						type="submit"
						className="w-1/2 py-2 bg-primary text-bg rounded-l hover:w-full hover:rounded-l-lg hover:tracking-widest transition-all duration-200 cursor-pointer font-semibold text-md"
					>
						Save changes
					</button>
				</div>
			</form>
		</div>
	)
}
