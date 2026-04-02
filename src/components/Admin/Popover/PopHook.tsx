import { useContext } from 'react'
import { PopoverContext } from './PopContext'

export function usePopover() {
	const ctx = useContext(PopoverContext)
	if (!ctx) {
		throw new Error('usePopover must be used inside PopoverProvider')
	}

	return ctx
}
