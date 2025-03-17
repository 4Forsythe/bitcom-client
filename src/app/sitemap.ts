import { MetadataRoute } from 'next'

import { ROUTE } from '@/config/routes.config'

import { productService } from '@/services/product.service'

const baseUrl = process.env.BASE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const products = await productService.getAll()

	const productsMetadata: MetadataRoute.Sitemap = products.items.map(
		({ id, createdAt }) => ({
			url: `${baseUrl}${ROUTE.PRODUCT}/${id}`,
			lastModified: new Date(createdAt)
		})
	)

	return [
		{
			url: `${baseUrl}${ROUTE.HOME}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.ABOUT}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.ASSEMBLY}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.BUYING}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.SERVICE}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.UPGRADING}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.SEARCH}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.CATALOG}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.DEVICES}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.PRICES}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.TABLES}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.BLOG}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.PROFILE}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.ORDERLIST}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.CART}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.WISHLIST}`,
			lastModified: new Date()
		},
		{
			url: `${baseUrl}${ROUTE.POLICIES}`,
			lastModified: new Date()
		},
		...productsMetadata
	]
}
