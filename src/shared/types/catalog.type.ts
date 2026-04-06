import { z } from 'zod'

export type CatalogType = {
	id: string
	name: string
	description: string
	price: number
	price_min: number
	price_max: number
	image_urls: string[]
	created_at: string
}

export const CatalogFilterSchema = z.object({
	search: z.string().optional(),
	price_min: z.number().optional(),
	price_max: z.number().optional()
})

export type CatalogFilterType = z.infer<typeof CatalogFilterSchema>