import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
	  lastModified: new Date(),
	  changeFrequency: 'monthly',
	  priority: 1.0,
	},
	{
	  url: `${process.env.NEXT_PUBLIC_BASE_URL}/catalog`,
	  lastModified: new Date(),
	  changeFrequency: 'weekly',
	  priority: 0.8,
	},
  ]
}