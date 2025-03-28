import { cache } from 'react'
import { notFound } from 'next/navigation'

import { getImage } from '@/utils/get-image'
import { findLatestCategory } from '@/utils/find-latest-category'
import { Breadcrumb, Product, SimilarList } from '@/components'

import { SERVER_BASE_URL } from '@/constants'
import { ROUTE } from '@/config/routes.config'
import { productService } from '@/services/product.service'

const getProduct = cache(async (id: string) => {
	try {
		const data = await productService.getOne(id)
		return data
	} catch (error) {
		console.error('[PRODUCT] Failed to getProduct:', error)
	}
})

const getSimilar = async (id: string, params?: { take: number }) => {
	return productService.getSimilar(id, params)
}

export const generateMetadata = async ({ params }: ProductPageProps) => {
	const product = await getProduct(params.id)

	if (!product) return {}

	return {
		title: `Купить ${product.name} в Тольятти Б/У с гарантией`,
		description: `${product.name} — купить Б/У с гарантией по самым выгодным ценам в Тольятти, Самаре, Сызрани. В наличии ${product.count} шт. Наш каталог обновляется регулярно, и вы всегда сможете найти самые актуальные предложения и новинки. Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
}

export const revalidate = 3600

interface ProductPageProps {
	params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = params

	const product = await getProduct(id)
	const similar = await getSimilar(id)

	if (!product) notFound()

	let imagePlaceholder = '/static/image-placeholder.png'

	if (product.imageUrl) {
		const response = await getImage(`${SERVER_BASE_URL}/${product.imageUrl}`)

		if (response) {
			imagePlaceholder = response.base64
		} else if (product.category?.imageUrl) {
			imagePlaceholder = `/static/${product.category.imageUrl}`
		}
	}

	const latestCategory = product.category
		? findLatestCategory(product.category)
		: undefined

	const productWithLatestCategory = { ...product, category: latestCategory }

	return (
		<>
			<Breadcrumb
				value={product.name}
				items={[
					{ href: ROUTE.HOME, value: 'Главная' },
					{ href: ROUTE.CATALOG, value: 'Каталог' },
					...(product.category && product.category?.id !== latestCategory?.id
						? [
								{
									href: `${ROUTE.CATALOG}/${product.category?.id}`,
									value: product.category.name
								}
							]
						: []),
					...(product.category
						? product.category.children.map((child) => ({
								href: `${ROUTE.CATALOG}/${child.id}`,
								value: child.name
							}))
						: [])
				]}
			/>
			<Product
				{...productWithLatestCategory}
				imagePlaceholder={imagePlaceholder}
			/>
			{similar.items.length > 0 && (
				<SimilarList
					categoryId={latestCategory?.id}
					{...similar}
				/>
			)}
		</>
	)
}
