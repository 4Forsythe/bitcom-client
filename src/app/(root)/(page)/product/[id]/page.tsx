import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { findLatestCategory } from '@/utils/find-latest-category'
import { Breadcrumb, Product, SimilarList } from '@/components'

import { ROUTE } from '@/config/routes.config'
import { productService } from '@/services/product.service'

const BASE_URL = String(process.env.BASE_URL)
const SERVER_BASE_URL = String(process.env.SERVER_BASE_URL)

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

export const generateMetadata = async ({
	params
}: ProductPageProps): Promise<Metadata> => {
	const product = await getProduct(params.id)

	if (!product) return {}

	const imageSrc =
		product.images.length > 0
			? `${SERVER_BASE_URL}/${product.images[0].url}`
			: product.category?.imageUrl
				? `${BASE_URL}/static/${product.category.imageUrl}`
				: `${BASE_URL}/static/opengraph-image.jpg`

	return {
		title: `Купить ${product.name} в Тольятти Б/У${product.guarantee ? ' с гарантией' : ''}`,
		description: `${product.name} — купить Б/У с гарантией ${product.discountPrice || product.price ? `от ${product.discountPrice || product.price} рублей` : 'по выгодным ценам'} в Тольятти, Самаре, Сызрани. В наличии ${product.count} шт. Наш каталог обновляется регулярно, и вы всегда сможете найти самые актуальные предложения и новинки. Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`,
		openGraph: {
			images: [{ url: imageSrc, alt: product.name }]
		}
	}
}

export const revalidate = 3600

interface ProductPageProps {
	params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = params

	const product = await getProduct(id)

	if (!product) notFound()

	const similar = await getSimilar(id)

	const latestCategory = findLatestCategory(product.category)
	const productWithLatestCategory = { ...product, category: latestCategory }

	return (
		<>
			<Breadcrumb
				value={product.name}
				items={[
					{ href: ROUTE.HOME, value: 'Главная' },
					{ href: ROUTE.CATALOG, value: 'Каталог' },
					{
						href: `${ROUTE.CATALOG}/${product.category?.id}`,
						value: product.category.name
					},
					...(product.category
						? product.category.children.map((child) => ({
								href: `${ROUTE.CATALOG}/${child.id}`,
								value: child.name
							}))
						: [])
				]}
			/>
			<Product {...productWithLatestCategory} />
			{similar.items.length > 0 && (
				<SimilarList
					categoryId={latestCategory?.id}
					{...similar}
				/>
			)}
		</>
	)
}
