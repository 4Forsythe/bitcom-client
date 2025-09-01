import { MetadataRoute } from 'next'

import { ROUTE } from '@/config/routes.config'

const baseUrl = process.env.BASE_URL

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [
				ROUTE.PROFILE,
				ROUTE.CART,
				ROUTE.WISHLIST,
				ROUTE.ORDERLIST,
				ROUTE.ADD_PRODUCT,
				ROUTE.ADD_DISCOUNT,
				ROUTE.MY_PRODUCTS,
				ROUTE.MY_DISCOUNTS,
				ROUTE.EXPORT,
				ROUTE.UPLOAD_DOCX
			]
		},
		sitemap: `${baseUrl}${ROUTE.SITEMAP}`
	}
}
