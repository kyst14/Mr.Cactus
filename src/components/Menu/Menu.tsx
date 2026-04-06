import { PAGES } from '@/config/pages.config'
import Image from 'next/image'

import { SearchInput } from '../SearchInput'
import { MenuItem } from './MenuItem'
import { Suspense } from 'react'

export default function Header() {
	return (
		<header className="relative w-screen z-10 flex justify-between items-center p-4 px-10 bg-transparent ">
			<nav className="flex items-center gap-5">
				<ul className="flex list-none">
					<MenuItem
						href={PAGES.HOME}
						hover={false}
					>
						<Image
							src="/logo.png"
							alt="Logo"
							width={50}
							height={50}
							loading="eager"
						/>
					</MenuItem>
				</ul>
				<ul className="flex gap-5 text-text text-xl list-none">
					<MenuItem href={PAGES.HOME}>Головна</MenuItem>
					<MenuItem href={PAGES.CATALOG}>Каталог</MenuItem>
					<MenuItem href={PAGES.CONTACT}>Контакти</MenuItem>
				</ul>
			</nav>
			<nav className="w-1/3">
				<Suspense fallback={null}>
					<SearchInput />
				</Suspense>
			</nav>
		</header>
	)
}
