import { Analytics } from '@/components/Analytics'
import { CookieBanner } from '@/components/Cookie'
import { Footer } from '@/components/Footer/Footer'
import Menu from '@/components/Menu/Menu'
import { Suspense } from 'react'

export default function PublicLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div>
			<Suspense fallback={null}>
				<Analytics />
			</Suspense>
			<CookieBanner />
			<Menu />
			{children}
			<Footer />
		</div>
	)
}
