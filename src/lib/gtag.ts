export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

export const pageview = (url: string) => {
	if (typeof window === 'undefined') {
		return
	} else if (process.env.NODE_ENV !== 'production') {
		console.warn(
			`Google Analytics works only in production. Please set NODE_ENV=production to start tracking. Pageview: ${url}`
		)
		return
	}
	window.gtag('config', GA_ID, {
		page_path: url
	})
}

export const logEvent = (name: string, params = {}) => {
	if (typeof window === 'undefined') return
	window.gtag('event', name, params)
}
