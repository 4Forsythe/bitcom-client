import { cache } from 'react'
import { Breadcrumb, ProductList } from '@/components'

import { getSearchParams } from '@/utils/get-search-params'

import { productService } from '@/services/product.service'
import { ROUTE } from '@/config/routes.config'

const getProducts = cache(
	async (searchParams: { [key: string]: string | undefined }) => {
		const { query, category, sortBy, orderBy, page, limit } =
			getSearchParams(searchParams)

		return productService.getAll({
			name: query,
			categoryId: category,
			sortBy: sortBy,
			orderBy: orderBy,
			take: limit,
			skip: (page - 1) * limit
		})
	}
)

export const generateMetadata = async ({ searchParams }: SearchPageProps) => {
	const data = await getProducts(searchParams)

	const { query } = getSearchParams(searchParams)

	if (!data) {
		return {
			title: `${query ? `Поиск — ${query}` : 'Результаты поиска'}`
		}
	}

	const items = data.items.map((item) => item.name).join(', ')

	return {
		title: `${query ? `Поиск — ${query}` : 'Каталог — поиск'}`,
		description: `${query || 'Поиск'} — купить Б/У по самым выгодным ценам в городе Тольятти. ${items}. Всего ${data.count} шт. Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
}

export const revalidate = 60

interface SearchPageProps {
	searchParams: { [key: string]: string | undefined }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const params = getSearchParams(searchParams)

	const products = await getProducts(searchParams)

	return (
		<>
			<Breadcrumb
				value={params.query || 'Поиск'}
				items={[
					{ href: ROUTE.HOME, value: 'Главная' },
					...(params.query ? [{ href: ROUTE.CATALOG, value: 'Каталог' }] : [])
				]}
			/>
			<ProductList {...products} />
		</>
	)
}
