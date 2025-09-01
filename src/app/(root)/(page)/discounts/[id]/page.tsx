import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Breadcrumb, Discount } from '@/components'

import { ROUTE } from '@/config/routes.config'
import { discountService } from '@/services/discount.service'
import { DiscountTypeVariables } from '@/types/discount.types'

const getDiscount = cache(async (id: string) => {
	try {
		const data = await discountService.getOne(id)
		return data
	} catch (error) {
		console.error('[DISCOUNT] Failed to getDiscount:', error)
	}
})

export const generateMetadata = async ({
	params
}: DiscountPageProps): Promise<Metadata> => {
	const discount = await getDiscount(params.id)

	if (!discount) return {}

	const firstTarget = discount.targets[0]

	const isProduct = firstTarget.product

	return {
		title: `${discount.name} — новая акция в магазине «БитКом» в Тольятти!`,
		description: `Скидка — ${discount.type === DiscountTypeVariables.PERCENT ? `${discount.amount}% на все товары из ${isProduct ? 'подборки' : `категории ${firstTarget.category?.name}`}` : `все по ${discount.amount} рублей`}! Время действия акции ОГРАНИЧЕНО: до ${new Date(discount.expiresAt).toLocaleString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })} в 0:00 по МСК.`
	}
}

export const revalidate = 3600

interface DiscountPageProps {
	params: { id: string }
}

export default async function DiscountPage({ params }: DiscountPageProps) {
	const { id } = params

	const discount = await getDiscount(id)

	if (!discount) notFound()

	return (
		<>
			<Breadcrumb
				value={discount.name}
				items={[
					{ href: ROUTE.HOME, value: 'Главная' },
					{ href: ROUTE.DISCOUNTS, value: 'Скидки и акции' }
				]}
			/>
			<Discount {...discount} />
		</>
	)
}
