'use client'

import { PopTypeAdmin } from '@/shared/types/typePop'
import { usePopover } from './PopoverHook'

type Props = {
	data: PopTypeAdmin
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const PopBtn = ({ data, ...props }: Props) => {
	const { openPop } = usePopover()

	return (
		<button
			{...props}
			onClick={() => openPop(data.type, data.data)}
		>
			Edit
		</button>
	)
}
