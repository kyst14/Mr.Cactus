import { Suspense } from 'react'
import { PopBtn } from './Popover/PopBtn'

export const ActionsBar = () => {
	return (
		<div className="flex justify-start px-5">
			<Suspense fallback={null}>
				<PopBtn
					data={{ type: 'addAdmin' }}
					className="w-fit px-10 py-2"
				>
					Add Admin
				</PopBtn>
			</Suspense>
		</div>
	)
}
