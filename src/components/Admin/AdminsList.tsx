import { PAGES } from '@/config/pages.config'
import { AdminUser } from '../../shared/types/admin.type'
import { PopBtn } from './Popover/PopBtn'
import { headers } from 'next/headers'
import { PopTypeAdmin } from '@/shared/types/typePop'

export const AdminsList = async () => {
	const { data: admins, success }: { data: AdminUser[], success: boolean } = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL + PAGES.API.ADMIN,
		{
			headers: {
				cookie: (await headers()).get('cookie') || '',
			}
		}
	).then(res => res.json())

	return (
		<div className="p-0 md:p-4">
			{admins && success ? (
				<table className="table-auto md:table-fixed w-full border-collapse border border-text/30">
					<thead className="bg-text/10 uppercase">
						<tr className="text-left">
							<th>Username</th>
							<th>ID</th>
							<th>Password</th>
							<th>Role</th>
							<th>Blocked</th>
							<th>Created At</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{admins.map(admin => (
							<tr
								key={admin.id}
								className="border-b"
							>
								<td>{admin.username}</td>
								<td className="font-mono text-sm ">
									{admin.id}
								</td>
								<td>••••••••••••</td>
								<td>{admin.role}</td>
								<td>
									<input
										className="w-4 h-4 cursor-pointer"
										type="checkbox"
										checked={admin.blocked}
										readOnly
										disabled
									/>
									{admin.blocked ? 'Yes' : 'No'}
								</td>
								<td>
									{new Date(
										admin.created_at
									).toLocaleString()}
								</td>

								<td>
									<PopBtn
										data={{
											type: 'editAdmin',
											data: admin
										} as PopTypeAdmin}
										className="w-full p-1 bg-primary/60 text-white rounded hover:bg-primary/80 transition-colors duration-200 cursor-pointer"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
		</div>
	)
}
