type CardProps = {
	id: string | number
	title: string
	description?: string
	image?: string[]
}

export const Card = (data: CardProps) => {
	return (
		<div>
			<h1>Card</h1>
			<p>card id: {data.id}</p>
			<p>card title: {data.title}</p>
			<p>card description: {data.description}</p>
			<p>card image: {data.image}</p>
		</div>
	)
}