import AdminNavigation from '@/components/Admin/AdminNavigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Admin Panel'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<AdminNavigation />
			{children}
		</div>
	)
}