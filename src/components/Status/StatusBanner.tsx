import { StatusType } from '@/shared/types/status.type'
import { useEffect } from 'react'

const getStatusColor = (status: StatusType): string => {
	switch (status.status) {
		case 'error':
			return 'bg-error'
		case 'success':
			return 'bg-success'
		case 'info':
			return 'bg-info'
		default:
			return 'bg-warning'
	}
}

export const StatusBanner = ({ data }: { data: StatusType[] }) => {
	useEffect(() => {
		const timeouts: NodeJS.Timeout[] = []

		data.forEach(status => {
			if (status.visible) {
				const timeout = setTimeout(() => {
					status.close()
				}, 3000) 

				timeouts.push(timeout)
			}
		})

		return () => {
			timeouts.forEach(timeout => clearTimeout(timeout))
		}
	}, [data])

	return (
		<div className="fixed top-5 gap-2 flex flex-col right-0 w-full sm:w-1/2 sm:right-5 md:w-1/3 z-99">
			{data.map(status => (
				<div
					key={status.id}
					id={status.id}
					className={`p-4 text-white rounded flex flex-col translate-x-0 transform transition-all duration-500 ease-in-out
					${status.visible ? 'translate-x-0' : 'translate-x-[calc(100%+5rem)]'} 
					${getStatusColor(status)} mb-2`}
				>
					<h3 className="font-bold">{status.title}</h3>
					<p className="font-sans">{status.description}</p>
				</div>
			))}
		</div>
	)
}
