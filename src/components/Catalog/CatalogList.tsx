import { prisma } from '@/lib/database'
import { CatalogFilterType, CatalogType } from '@/shared/types/catalog.type'
import { Card } from './Card'

export const CatalogList = async ({
	filter
}: {
	filter: CatalogFilterType
}) => {
	const catalog = await prisma.product.findMany()
	const filtered = filterCatalog(catalog, filter)

	return (
		<div className="w-full">
			{filtered.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map(item => (
						<Card
							key={item.id}
							data={item}
						/>
					))}
				</div>
			) : (
				<h1 className="text-2xl font-bold text-center">
					Товарів не знайдено
				</h1>
			)}
		</div>
	)
}

function filterCatalog(
	catalog: CatalogType[],
	params: CatalogFilterType
): CatalogType[] {
	const search = params.search?.toLowerCase().trim().replace(/\s+/g, ' ')

	return catalog.filter(item => {
		return (
			!search ||
			(item.name.toLowerCase().includes(search) ||
				(item.priceMin === undefined || item.priceMin >= params.priceMin!) &&
				(item.priceMax === undefined || item.priceMax <= params.priceMax!)
			)
		)
	})
}
