import { PAGES } from '@/config/pages.config'
import Image from 'next/image'

import { MenuItem } from './MenuItem'
import { SearchInput } from './SearchInput'

export default function Header() {
	return (
		<header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 px-10 bg-transparent ">
			<nav className="flex items-center gap-5">
				<MenuItem href={PAGES.HOME} hover={false}>
					<Image src="/logo.png" alt="Logo" width={50} height={50} loading="eager" />
				</MenuItem>
				<ul className="flex gap-5 text-text text-xl">
					<MenuItem href={PAGES.HOME}>Головна</MenuItem>
					<MenuItem href={PAGES.CATALOG}>Каталог</MenuItem>
				</ul>
			</nav>
			<nav>
				<SearchInput />
			</nav>
		</header>
	)
}
