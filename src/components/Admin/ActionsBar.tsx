import { PopBtn } from './Popover/PopBtn'

export const ActionsBar = () => {
	return (
		<div className="flex justify-start px-5">
			<PopBtn
				data={{ type: 'addAdmin' }}
				className="w-fit px-10 py-2"
			/>
		</div>
	)
}
