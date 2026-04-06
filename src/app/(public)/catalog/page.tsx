import { CatalogFilter } from '@/components/Catalog/CatalogFilter'
import { CatalogList } from '@/components/Catalog/CatalogList'
import {
	CatalogFilterSchema,
	CatalogFilterType
} from '@/shared/types/catalog.type'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Mr.Cactus | Catalog',
	description: 'Browse all our flowers and plants in the catalog.'
}

export default async function CatalogPage({
	searchParams
}: {
	searchParams: Promise<CatalogFilterType>
}) {
	const params = await searchParams

	// filter catalog, delete params that are not in CatalogFilterType
	const filtered = CatalogFilterSchema.parse(params)

	return (
		<div className="flex flex-col min-h-screen items-start gap-4 bg-bg">
			<CatalogFilter defaults={filtered} />
			<CatalogList filter={filtered} />
		</div>
	)
}
