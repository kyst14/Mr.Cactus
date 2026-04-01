export type Status = "error" | "success" | "info" | "warning"

export type StatusData = {
	status: Status
	title: string
	description: string
}

export type StatusType = {
	id: string
	visible: boolean
	changeVisible: (visible: boolean) => void
	close: () => void
} & StatusData
