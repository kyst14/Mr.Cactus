import { PopType } from '@/shared/types/typePop'
import { createContext } from 'react'

export type PopoverContextType = {
	opened: boolean
	openPop: (type: PopType['type'], data: PopType['data']) => void
	closePop: () => void
	setOpened: (opened: boolean) => void
}

export const PopoverContext = createContext<PopoverContextType | null>(null)
