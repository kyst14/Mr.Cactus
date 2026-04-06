import { PAGES } from '@/config/pages.config'
import { CatalogFilterType, CatalogType } from '@/shared/types/catalog.type'
import { Card } from './Card'

export const CatalogList = async ({
	filter
}: {
	filter: CatalogFilterType
}) => {
	// TODO: optimize, filter on the server
	const res = await fetch(PAGES.API.CATALOG, {
		next: { revalidate: 60 * 10 } // revalidate every 10 minutes
	})

	if (!res.ok) {
		throw new Error('Failed to fetch catalog')
	}

	const json = await res.json()

	const catalog: CatalogType[] = filterCatalog(json.data ?? [], filter)

	return (
		<div className="w-full">
			{catalog.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{catalog.map(item => (
						<Card
							key={item.id}
							data={item}
						/>
					))}
				</div>
			) : (
				<h1 className="text-2xl font-bold text-center">Товарів не знайдено</h1>
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
			(item.name.toLowerCase().includes(search) &&
				(params.price_min === undefined ||
					item.price >= params.price_min) &&
				(params.price_max === undefined ||
					item.price <= params.price_max))
		)
	})
}
