import { Analytics } from '@/components/Analytics'
import { CookieBanner } from '@/components/Cookie'
import { Footer } from '@/components/Footer/Footer'
import Menu from '@/components/Menu/Menu'
import { GA_ID } from '@/lib/gtag'
import Script from 'next/script'
import { Suspense } from 'react'

export default function PublicLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{/* Google Analytics */}
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
			/>
			<Script
				id="ga4-init"
				strategy="afterInteractive"
			>
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){window.dataLayer.push(arguments);}
					window.gtag = gtag;

					gtag('consent', 'default', {
						analytics_storage: 'denied',
						ad_storage: 'denied',
						ad_user_data: 'denied',
						ad_personalization: 'denied'
					});

					gtag('js', new Date());

					gtag('config', '${GA_ID}', {
						anonymize_ip: true,
						ad_storage: 'denied',
						wait_for_update: 500
					});
				`}
			</Script>

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
