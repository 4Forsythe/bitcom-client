import { cache } from 'react'
import { notFound } from 'next/navigation'

import { Breadcrumb, ProductList } from '@/components'

import { formatCase } from '@/utils/format-case'
import { getSearchParams } from '@/utils/get-search-params'
import { findLatestCategory } from '@/utils/find-latest-category'

import { ROUTE } from '@/config/routes.config'
import { productService } from '@/services/product.service'
import { productCategoryService } from '@/services/product-category.service'

const getCategory = cache(async (id: string) => {
	try {
		const data = await productCategoryService.getOne(id)
		return data
	} catch (error) {
		console.error('[CATALOG/[id]] Failed to getCategory:', error)
	}
})

const getProducts = cache(
	async (id: string, searchParams?: { [key: string]: string | undefined }) => {
		const { query, device, brand, model, sortBy, orderBy, page, limit } =
			getSearchParams(searchParams)

		return productService.getAll({
			name: query,
			categoryId: id,
			deviceId: device,
			brandId: brand,
			modelId: model,
			sortBy: sortBy,
			orderBy: orderBy,
			take: limit,
			skip: (page - 1) * limit
		})
	}
)

export const generateMetadata = async ({
	params,
	searchParams
}: ProductsPageProps) => {
	const category = await getCategory(params.id)
	const data = await getProducts(params.id, searchParams)

	if (!category) return {}

	if (!data) {
		return {
			title: `${formatCase(category.name)} — купить Б/У по самым выгодным ценам в Тольятти`
		}
	}

	const items = data.items.map((item) => item.name).join(', ')

	return {
		title: `${formatCase(category.name)} — купить Б/У по самым выгодным ценам в Тольятти`,
		description: `${formatCase(category.name)} — купить Б/У по самым выгодным ценам в Тольятти. ${items}. Всего ${data.count} шт. Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
}

export const revalidate = 3600

interface ProductsPageProps {
	params: { id: string }
	searchParams?: { [key: string]: string | undefined }
}

export default async function ProductsPage({
	params,
	searchParams
}: ProductsPageProps) {
	const { id: encodedId } = params
	const id = decodeURIComponent(encodedId)

	const category = await getCategory(id)

	if (!category) notFound()

	const products = await getProducts(id, searchParams)
	const latestCategory = findLatestCategory(category)

	return (
		<>
			<Breadcrumb
				value={latestCategory.name}
				items={[
					{ href: ROUTE.HOME, value: 'Главная' },
					{ href: ROUTE.CATALOG, value: 'Каталог' },
					...(category.id !== latestCategory.id
						? [
								{
									href: `${ROUTE.CATALOG}/${category.id}`,
									value: category.name
								}
							]
						: []),
					...category.children.slice(0, -1).map((child) => ({
						href: `${ROUTE.CATALOG}/${child.id}`,
						value: child.name
					}))
				]}
			/>
			<ProductList {...products} />
		</>
	)
}
