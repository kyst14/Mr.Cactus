import { z } from 'zod'

export type CatalogType = {
	id: number
	name: string
	description: string | null
	priceMin: number
	priceMax: number
	mediaUrls: string[]
	createdAt: Date
	updatedAt: Date
}

export const CatalogFilterSchema = z.object({
	search: z.string().optional(),
	priceMin: z.number().optional(),
	priceMax: z.number().optional()
})

export type CatalogFilterType = z.infer<typeof CatalogFilterSchema>