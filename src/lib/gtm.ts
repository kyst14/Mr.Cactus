export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''

export function logEvent(name: string, params?: Record<string, unknown>) {
	if (typeof window === 'undefined') return

	window.dataLayer = window.dataLayer || []
	window.dataLayer.push({
		event: name,
		...params
	})

	if (process.env.NODE_ENV !== 'production') {
		console.log(`GTM Event: ${name}`, params)
	}
}

let warned: boolean = false
export function pageview(url: string) {
	if (typeof window === 'undefined') return
	if (process.env.NODE_ENV !== 'production' && !warned) {
		console.warn(
			`Google Tag Manager works only in production. Please set NODE_ENV=production to start tracking. Pageview: ${url}`
		)
		warned = true
	}
	logEvent('page_view', {
		page_path: url
	})
}
