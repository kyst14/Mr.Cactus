import prisma from '@/lib/database'
import { Suspense } from 'react'
import { PopBtn } from './Popover/PopBtn'

export const AdminsList = async ({ id = null }: { id: number | null }) => {
	const admins = await prisma.admin.findMany({
		orderBy: {
			createdAt: 'desc' // Sort by createdAt in descending order
		}
	})

	return (
		<div className="p-0 md:p-4">
			{admins ? (
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
									{new Date(admin.createdAt).toLocaleString()}
								</td>

								<td>
									<Suspense fallback={null}>
										<PopBtn
											data={{
												type: 'editAdmin',
												data: admin
											}}
											autoOpen={id === admin.id}
											className="w-full p-1 bg-primary/60 text-white rounded hover:bg-primary/80 transition-colors duration-200 cursor-pointer"
										>
											{' '}
											Edit{' '}
										</PopBtn>
									</Suspense>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
		</div>
	)
}
