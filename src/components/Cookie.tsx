'use client'

import { logEvent } from '@/lib/gtm'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function CookieBanner() {
	const updateConsent = (status: 'granted' | 'denied') => {
		localStorage.setItem('cookie-consent', status)

		logEvent('consent_update', {
			analytics_storage: status,
			ad_storage: status === 'granted' ? 'granted' : 'denied'
		})
	}

	useEffect(() => {
		const consent = localStorage.getItem('cookie-consent')
		if (consent === 'granted' || consent === 'denied') {
			updateConsent(consent as 'granted' | 'denied')
			return
		}

		const id = toast.message('Ми використовуємо cookies', {
			description:
				'Це допомагає нам зрозуміти, як використовується сайт.',
			duration: Infinity,
			icon: (
				<FontAwesomeIcon
					icon={faCookieBite}
					size="lg"
				/>
			),
			position: 'bottom-center',

			action: {
				label: 'Accept',
				onClick: () => {
					updateConsent('granted')
					toast.dismiss(id)
				}
			},

			cancel: {
				label: 'Decline',
				onClick: () => {
					updateConsent('denied')
					toast.dismiss(id)
				}
			}
		})
	}, [])

	return null
}
