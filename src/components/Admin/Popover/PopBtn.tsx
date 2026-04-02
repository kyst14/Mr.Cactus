'use client'

import { PopType } from '@/shared/types/typePop'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { usePopover } from './PopHook'

type Props = {
	data: PopType
	autoOpen?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const PopBtn = ({ data, autoOpen = false, ...props }: Props) => {
	const router = useRouter()
	const { openPop } = usePopover()

	useEffect(() => {
		if (autoOpen) {
			openPop(data.type, data.data)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoOpen, data])

	const handleClick = () => {
		openPop(data.type, data.data)
		if (!data.data) {
			return
		}

		const params = new URLSearchParams(
			typeof window !== 'undefined' ? window.location.search : ''
		)
		params.set('id', data.data.id)

		router.push(`?${params.toString()}`)
	}

	return (
		<button
			onClick={() => handleClick()}
			{...props}
			className={`p-1 bg-primary/60 text-white rounded hover:bg-primary/80 transition-colors duration-200 cursor-pointer ${
				props.className || ''
			}`}
		>
			{props.children}
		</button>
	)
}
