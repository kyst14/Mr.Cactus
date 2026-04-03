import { BASE_URL } from '@/config/pages.config'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1.0
		},
		{
			url: `${BASE_URL}/catalog`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8
		}
	]
}
