import { Home } from '@/components'

import { getBlogMetadata } from '@/utils/get-blog-metadata'
import { productService } from '@/services/product.service'

export const revalidate = 1800

export default async function RootPage() {
	const posts = await getBlogMetadata({ take: 8 })
	const products = await productService.getAll({
		take: 16,
		onlyOriginalPrice: true,
		sortBy: 'createdAt',
		orderBy: 'desc'
	})
	const discountProducts = await productService.getDiscount({
		take: 8,
		sortBy: 'createdAt',
		orderBy: 'desc'
	})

	return (
		<Home
			products={products}
			discountProducts={discountProducts}
			posts={posts}
		/>
	)
}
