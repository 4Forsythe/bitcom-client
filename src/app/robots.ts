import { MetadataRoute } from 'next'

import { ROUTE } from '@/config/routes.config'

const baseUrl = process.env.BASE_URL

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [ROUTE.PROFILE, ROUTE.CART, ROUTE.WISHLIST, ROUTE.ORDERLIST]
		},
		sitemap: `${baseUrl}${ROUTE.SITEMAP}`
	}
}
