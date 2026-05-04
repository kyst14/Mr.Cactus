import { ActionsBar } from '@/components/Admin/ActionsBarAdmin'
import { AdminsList } from '@/components/Admin/AdminsList'

export default async function AdminsPage({
	searchParams
}: {
	searchParams: Promise<{ id?: number }>
}) {
	const params = await searchParams

	return (
		<div>
			<h1 className="text-2xl font-bold text-center font-heading">
				Admins Management
			</h1>

			<ActionsBar />
			<AdminsList id={params.id || null} />
		</div>
	)
}
