import { MetadataRoute } from 'next'

import { ROUTE } from '@/config/routes.config'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [ROUTE.PROFILE, ROUTE.CART, ROUTE.WISHLIST, ROUTE.ORDERLIST]
		},
		sitemap: ROUTE.SITEMAP
	}
}
