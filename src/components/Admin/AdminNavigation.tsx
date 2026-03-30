import Link from 'next/link'
import { PAGES } from '@/config/pages.config'

const AdminNavigation = () => {
	return (
		<nav className="flex items-center justify-center gap-4 p-4 bg-primary text-white">
			<ul className="flex items-center gap-4">
				<li><Link href={PAGES.DASHBOARD}>Dashboard</Link></li>
				<li><Link href={PAGES.DASHBOARD_CATALOG}>Catalog</Link></li>
				<li><Link href={PAGES.ADMINS}>Admins</Link></li>
				<li><Link href={PAGES.SETTINGS}>Settings</Link></li>
			</ul>
		</nav>
	)
}

export default AdminNavigation