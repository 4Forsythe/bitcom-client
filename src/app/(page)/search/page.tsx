import { cache } from 'react'
import { Breadcrumb, ProductList } from '@/components'

import { getSearchParams } from '@/utils/get-search-params'

import { productService } from '@/services/product.service'
import { ROUTE } from '@/config/routes.config'

const getProducts = cache(
	async (searchParams: { [key: string]: string | undefined }) => {
		const {
			query,
			category,
			device,
			brand,
			model,
			sortBy,
			orderBy,
			page,
			limit
		} = getSearchParams(searchParams)

		return productService.getAll({
			name: query,
			categoryId: category,
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

export const generateMetadata = async ({ searchParams }: SearchPageProps) => {
	const data = await getProducts(searchParams)

	const { query, device, brand } = getSearchParams(searchParams)

	if (!data) {
		return {
			title: `${query ? `Поиск — ${query}` : 'Результаты поиска'}`
		}
	}

	const items = data.items.map((item) => item.name).join(', ')

	return {
		title: `${query ? `Поиск — ${query}` : device ? device : 'Каталог — поиск'}`,
		description: `${device || brand || query || 'Поиск'} — купить Б/У по самым выгодным ценам в городе Тольятти. ${items}. Всего ${data.count} шт. Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
}

export const revalidate = 60

interface SearchPageProps {
	searchParams: { [key: string]: string | undefined }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { query, device } = getSearchParams(searchParams)

	const products = await getProducts(searchParams)

	return (
		<>
			<Breadcrumb
				value={query || device || 'Каталог'}
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<ProductList {...products} />
		</>
	)
}
