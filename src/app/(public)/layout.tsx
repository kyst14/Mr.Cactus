import { Analytics } from '@/components/Analytics'
import { CookieBanner } from '@/components/Cookie'
import { Footer } from '@/components/Footer/Footer'
import Menu from '@/components/Menu/Menu'
import { GTM_ID } from '@/lib/gtm'
import Script from 'next/script'
import { Suspense } from 'react'

export default function PublicLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{/* Google Tag Manager */}
			<Script
				id="gtm-head"
				strategy="beforeInteractive"
				dangerouslySetInnerHTML={{
					__html: `
					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','${GTM_ID}');
				`
				}}
			/>
			<noscript>
				<iframe
					src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
					height="0"
					width="0"
					style={{ display: 'none', visibility: 'hidden' }}
				/>
			</noscript>

			<div>
				<Suspense fallback={null}>
					<Analytics />
				</Suspense>
				<CookieBanner />
				<Menu />
				{children}
				<Footer />
			</div>
		</>
	)
}
