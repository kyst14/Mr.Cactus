import { StatusData, StatusType } from '@/shared/types/status.type'
import { createContext } from 'react'

export type StatusContextType = {
	statusMap: Map<string, StatusType> | null
	addStatus: (data: StatusData) => string
}

export const StatusContext = createContext<StatusContextType | null>(null)
