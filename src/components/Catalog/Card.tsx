import { CatalogType } from '@/shared/types/catalog.type'
import Image from 'next/image'
import Link from 'next/link'

export const Card = ({ data }: { data: CatalogType }) => {
	return (
		<Link
			className="block"
			href={`/catalog/${data.id}`}
		>
			<div className="flex flex-col items-center justify-center gap-4 bg-bg shadow-lg p-5 rounded hover:scale-105 transition-transform duration-300 ease-in-out">
				<div className="flex items-center justify-center">
					<Image
						src={data.mediaUrls[0] || '/placeholder.svg'}
						alt={data.name}
						width={200}
						height={200}
					/>
				</div>

				<div className="flex flex-col items-center justify-center">
					<h1 className="text-2xl font-bold">{data.name}</h1>
					<p className="text-lg font-light">{data.description}</p>
					<p className="text-lg font-bold">₴{data.priceMin} - ₴{data.priceMax}</p>
				</div>
			</div>
		</Link>
	)
}
