import AdminNavigation from '@/components/Admin/AdminNavigation'
import { PopoverProvider } from '@/components/Admin/Popover/PopProvider'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Admin Panel'
}

export default function AdminLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<PopoverProvider>
			<AdminNavigation />
			{children}
		</PopoverProvider>
	)
}
