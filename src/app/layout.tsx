import type { Metadata } from 'next'
import { Nunito, Oswald } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/Theme/ThemeProvider'
import { Toaster } from 'sonner'

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin', 'cyrillic'],
	display: 'swap'
})

const oswald = Oswald({
	variable: '--font-oswald',
	subsets: ['latin', 'cyrillic'],
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Mr.Cactus',
	description: 'Mr.Cactus is a family flower store.',
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
	),
	keywords: [
		'mr.cactus',
		'mrcactus',
		'mr cactus',
		'flower',
		'flower shop',
		'family flower store',
		'flower delivery',
		'flower arrangement',
		'flower in ukraine',
		'flower delivery in ukraine',

		'квіти',
		'магазин ',
		'магазин квіт',
		'магазин квітів',
		'магазин квітів україни',
		'магазин квітів в україні',
		'доставка квітів',
		'доставка квітів в україні',

		'цветы',
		'магазин цветов',
		'магазин цветов украина',
		'магазин цветов в украине',
		'доставка цветов',
		'доставка цветов в украине'
	],
	icons: {
		icon: '/favicon.ico',
		apple: '/logo.png',
		shortcut: '/favicon.ico'
	},
	openGraph: {
		// Metadata for Open Graph
		title: 'Mr.Cactus',
		description: 'Mr.Cactus is a family flower store.',
		images: [
			{
				url: '/logo.png',
				width: 1200,
				height: 630,
				alt: 'Mr.Cactus'
			}
		]
	},
	robots: {
		index: true,
		follow: true
	},
	manifest: '/manifest.json'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body
				className={`${nunito.variable} ${oswald.variable} bg-bg antialiased m-0 p-0 font-sans`}
			>
				<ThemeProvider>
					<Toaster
						theme="light"
						richColors
						position="top-right"
						duration={4000}
						swipeDirections={['right']}
					/>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
