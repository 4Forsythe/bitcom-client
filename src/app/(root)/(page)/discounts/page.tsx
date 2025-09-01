import React, { cache } from 'react'

import { ROUTE } from '@/config/routes.config'
import { Breadcrumb, DiscountList } from '@/components'
import { getSearchParams } from '@/utils/get-search-params'
import { discountService } from '@/services/discount.service'

const getDiscounts = cache(
	async (searchParams: { [key: string]: string | undefined }) => {
		const { category, sortBy, orderBy, page, limit } =
			getSearchParams(searchParams)

		return discountService.getAll({
			categoryId: category,
			sortBy: sortBy,
			orderBy: orderBy,
			take: limit,
			skip: (page - 1) * limit
		})
	}
)

export const generateMetadata = async ({ searchParams }: SearchPageProps) => {
	const data = await getDiscounts(searchParams)

	if (!data) {
		return {
			title: 'Скидки и акции'
		}
	}

	const items = data.items.map((item) => item.name).join(', ')

	return {
		title:
			'Скидки и акции в интернет-магазине «БитКом» в Тольятти: распродажи, специальные и выгодные предложения',
		description: `Посмотрите самые выгодные предложения в интернет-магазине электронной техники «Битком» в Тольятти. ${items}. Время действия скидок и акций ограничено.`
	}
}

export const revalidate = 60

interface SearchPageProps {
	searchParams: { [key: string]: string | undefined }
}

export default async function DiscountsPage({ searchParams }: SearchPageProps) {
	const discounts = await getDiscounts(searchParams)

	return (
		<>
			<Breadcrumb
				value='Скидки и акции'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<DiscountList {...discounts} />
		</>
	)
}
