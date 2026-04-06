import { CatalogFilterType } from '@/shared/types/catalog.type'

export const CatalogFilter = ({
	defaults
}: {
	defaults: CatalogFilterType
}) => {
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<h1 className="text-2xl font-bold">Filters</h1>
			
			{defaults && Object.entries(defaults).map(([key, value]) => (
				<div key={key}>
					<h2 className="text-xl font-bold">{key}</h2>
					<p>{value}</p>
				</div>
			))}
		</div>
	)
}