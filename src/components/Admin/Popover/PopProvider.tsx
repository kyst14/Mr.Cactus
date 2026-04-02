'use client'

import { useState } from 'react'

import { PopType } from '@/shared/types/typePop'
import { useRouter } from 'next/navigation'
import { PopoverContext } from './PopContext'
import { Popover } from './Popover'

export function PopoverProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter()

	const [opened, setOpened] = useState(false)
	const [popData, setPopData] = useState({ type: '', data: {} })


	const openPop = (type: PopType['type'], data: PopType['data']) => {
		setPopData({ type, data: data || {} })
		setOpened(true)
	}
	const closePop = () => {
		const params = new URLSearchParams(
			typeof window !== 'undefined' ? window.location.search : ''
		)

		params.delete('id')

		router.push(`?${params.toString()}`)

		setOpened(false)
	}

	return (
		<PopoverContext.Provider
			value={{ opened, openPop, closePop, setOpened }}
		>
			<div
				className={`absolute top-0 left-0 w-screen h-screen z-50 ${opened ? 'backdrop-blur-xs' : 'backdrop-blur-none pointer-events-none'}`}
				onClick={e => {
					if (e.target === e.currentTarget) {
						closePop()
					}
				}}
			>
				<Popover
					opened={opened}
					data={popData as PopType}
				/>
			</div>
			{children}
		</PopoverContext.Provider>
	)
}
