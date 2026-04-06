'use client'

import { pageview } from '@/lib/gtm'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function Analytics() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		const url =
			pathname + (searchParams.toString() ? `?${searchParams}` : '')
		pageview(url)
	}, [pathname, searchParams])

	return null
}
