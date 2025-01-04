import { MetadataRoute } from 'next'

import { ROUTE } from '@/config/routes.config'

import { productService } from '@/services/product.service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const products = await productService.getAll()

	const productsMetadata: MetadataRoute.Sitemap = products.items.map(
		({ id, createdAt }) => ({
			url: `${ROUTE.PRODUCT}/${id}`,
			lastModified: new Date(createdAt)
		})
	)

	return [
		{
			url: ROUTE.HOME,
			lastModified: new Date()
		},
		{
			url: ROUTE.ABOUT,
			lastModified: new Date()
		},
		{
			url: ROUTE.ASSEMBLY,
			lastModified: new Date()
		},
		{
			url: ROUTE.BUYING,
			lastModified: new Date()
		},
		{
			url: ROUTE.SERVICE,
			lastModified: new Date()
		},
		{
			url: ROUTE.UPGRADING,
			lastModified: new Date()
		},
		{
			url: ROUTE.SEARCH,
			lastModified: new Date()
		},
		{
			url: ROUTE.CATALOG,
			lastModified: new Date()
		},
		{
			url: ROUTE.DEVICES,
			lastModified: new Date()
		},
		{
			url: ROUTE.BLOG,
			lastModified: new Date()
		},
		{
			url: ROUTE.PROFILE,
			lastModified: new Date()
		},
		{
			url: ROUTE.ORDERLIST,
			lastModified: new Date()
		},
		{
			url: ROUTE.CART,
			lastModified: new Date()
		},
		{
			url: ROUTE.WISHLIST,
			lastModified: new Date()
		},
		{
			url: ROUTE.POLICIES,
			lastModified: new Date()
		},
		...productsMetadata
	]
}
