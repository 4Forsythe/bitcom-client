import { cache } from 'react'
import { Breadcrumb, ProductList } from '@/components'

import { getSearchParams } from '@/utils/get-search-params'

import { productService } from '@/services/product.service'
import { ROUTE } from '@/config/routes.config'
import { deviceService } from '@/services/device.service'

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

	const {
		query,
		device: deviceId,
		brand: brandId
	} = getSearchParams(searchParams)

	if (!data) {
		return {
			title: `${query ? `Поиск — ${query}` : 'Результаты поиска'}`
		}
	}

	const items = data.items.map((item) => item.name).join(', ')

	const device = deviceId ? await deviceService.getOne(deviceId) : null

	return {
		title: `${device || query ? `Поиск — ${device?.name || query}` : 'Каталог — поиск'}`,
		description: `${device?.name || query || 'Поиск'} — купить Б/У по самым выгодным ценам в городе Тольятти. ${items}. Всего ${data.count} шт. Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
}

export const revalidate = 60

interface SearchPageProps {
	searchParams: { [key: string]: string | undefined }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const params = getSearchParams(searchParams)

	const device = params.device
		? await deviceService.getOne(params.device)
		: undefined

	const products = await getProducts(searchParams)

	return (
		<>
			<Breadcrumb
				value={params.query || device?.name || 'Поиск'}
				items={[
					{ href: ROUTE.HOME, value: 'Главная' },
					...(params.query || device
						? [{ href: ROUTE.CATALOG, value: 'Каталог' }]
						: [])
				]}
			/>
			<ProductList {...products} />
		</>
	)
}
