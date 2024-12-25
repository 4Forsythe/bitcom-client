import { cache } from 'react'
import { notFound } from 'next/navigation'

import { Catalog, Breadcrumb } from '@/components'

import { ROUTE } from '@/config/routes.config'
import { productCategoryService } from '@/services/product-category.service'

/* Дедупликация запроса */
const getCategories = cache(async () => {
	try {
		const data = await productCategoryService.getAll()
		return data
	} catch (error) {
		console.error('[CATALOG] Failed to getCategories:', error)
	}
})

export const generateMetadata = async () => {
	const data = await getCategories()

	if (!data || data.items.length === 0) {
		return {
			title: 'Каталог товаров'
		}
	}

	const items = data.items
		.map((item) => item.name)
		.join(', ')
		.toLowerCase()

	return {
		title: 'Каталог товаров',
		description: `Компания «БитКом» предоставляет широкий выбор товаров для офиса и дома: ${items}. Наш каталог обновляется регулярно, и вы всегда сможете найти самые актуальные предложения и новинки. Кроме того, у нас всегда есть выгодные акции и скидки по разным позициям!`
	}
}

export const revalidate = 60

export default async function CatalogPage() {
	const categories = await getCategories()

	if (!categories) notFound()

	return (
		<>
			<Breadcrumb
				value='Каталог'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<Catalog {...categories} />
		</>
	)
}
