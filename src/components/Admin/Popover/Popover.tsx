import { PopType } from '@/shared/types/typePop'
import { EditAdmin } from './type/editAdmin'
import { AddAdmin } from './type/addAdmin'

export const Popover = ({
	data,
	opened,
}: {
	data: PopType
	opened: boolean
}) => {
	return (
		<div
			className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-9/10 bg-bg shadow-lg shadow-primary rounded transition-opacity duration-200 opacity-0 ${opened ? 'opacity-100' : 'pointer-events-none'}`}
		>
			{data.type === 'editAdmin' && EditAdmin({ data })}
			{data.type === 'addAdmin' && AddAdmin({ data })}
		</div>
	)
}
