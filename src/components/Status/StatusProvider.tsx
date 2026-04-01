'use client'

import { StatusData, StatusType } from '@/shared/types/status.type'
import { useState } from 'react'
import { StatusBanner } from './StatusBanner'
import { StatusContext } from './StatusContext'

export function StatusProvider({ children }: { children: React.ReactNode }) {
	const [statusMap, setStatusMap] = useState<Map<string, StatusType>>(
		new Map()
	)

	const makeCloseFunction = (id: string) => {
		return () => {
			// set invisible
			setStatusMap(prev => {
				const newMap = new Map(prev)
				const status = newMap.get(id)
				console.log(status?.id)
				if (status) {
					newMap.set(id, { ...status, visible: false })
				}
				return newMap
			})

			// remove after animation
			setTimeout(() => {
				setStatusMap(prev => {
					const newMap = new Map(prev)
					newMap.delete(id)
					return newMap
				})
			}, 1000)
		}
	}

	const makeChangeVisibleFunction = (id: string) => {
		return (visible: boolean) => {
			setStatusMap(prev => {
				const status = prev.get(id)
				if (status) {
					prev.set(id, { ...status, visible })
				}
				return prev
			})
		}
	}

	const addStatus = (data: StatusData) => {
		const id = Date.now().toString()
		const newStatus: StatusType = {
			...data,
			id,
			visible: true,
			changeVisible: makeChangeVisibleFunction(id),
			close: makeCloseFunction(id)
		}

		setStatusMap(prev => new Map(prev).set(id, newStatus))

		console.log('Added status:', newStatus)

		return id
	}

	return (
		<StatusContext.Provider value={{ statusMap, addStatus }}>
			{statusMap && statusMap.size > 0 && (
				<StatusBanner data={Array.from(statusMap.values())} />
			)}
			{children}
		</StatusContext.Provider>
	)
}
