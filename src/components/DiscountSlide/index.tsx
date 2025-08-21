'use client'

import React from 'react'
import Link from 'next/link'

import type { DiscountType } from '@/types/discount.types'

import styles from './discount-slide.module.scss'
import { ROUTE } from '@/config/routes.config'
import { Button } from '../ui'
import { BadgePercent } from 'lucide-react'
import Image from 'next/image'
import { calcDiscountPercent } from '@/utils/calc-discount-price'
import { ProductCategoryType } from '@/types/product-category.types'
import { ProductType } from '@/types/product.types'
import { SERVER_BASE_URL } from '@/constants'
import { calcDaysDifference } from '@/utils/calc-days-difference'
import { calcTimeBetweenDates } from '@/utils/calc-time-between-dates'

export const DiscountSlide: React.FC<DiscountType> = ({
	id,
	type,
	amount,
	products,
	category,
	categoryId,
	startedAt,
	expiresAt
}) => {
	const firstTarget =
		products.length > 0 ? products[0] : category ? category : null

	if (!firstTarget) {
		return null
	}

	const isProduct = (
		item: ProductType | ProductCategoryType
	): item is ProductType => {
		return 'price' in item
	}

	const price = isProduct(firstTarget)
		? new Intl.NumberFormat('ru-RU').format(Number(firstTarget.price))
		: null

	const discountPrice = isProduct(firstTarget)
		? new Intl.NumberFormat('ru-RU').format(
				Number(firstTarget.price) - (Number(firstTarget.price) / 100) * amount
			)
		: null

	const expires = calcTimeBetweenDates(new Date(), new Date(expiresAt))

	const imageUrl = isProduct(firstTarget)
		? firstTarget.images.length > 0
			? `${SERVER_BASE_URL}/${firstTarget.images[0].url}`
			: firstTarget.category.imageUrl
				? `/static/${firstTarget.category.imageUrl}`
				: undefined
		: firstTarget.imageUrl
			? `/static/${firstTarget.imageUrl}`
			: undefined

	const firstTargetHref =
		products.length > 0
			? `${ROUTE.PRODUCT}/${products[0].slug}`
			: `${ROUTE.CATALOG}/${categoryId}`

	return (
		<div className={styles.container}>
			<span className={styles.title}>
				Скидка: {expires === 0 ? 'скоро закончится' : `еще ${expires}`}
			</span>
			<Link
				href={firstTargetHref}
				className={styles.targetLink}
			>
				{firstTarget.name}
			</Link>

			{type === 'percentage' && !isProduct(firstTarget) ? (
				<span className={styles.discountPercent}>-{amount}%</span>
			) : (
				<div className={styles.prices}>
					<span className={styles.discountPrice}>{discountPrice} ₽</span>
					<span className={styles.price}>{price} ₽</span>
				</div>
			)}
			<Button
				size='sm'
				asLink={`${ROUTE.DISCOUNTS}/${id}`}
				className={styles.moreLink}
			>
				Узнать больше
			</Button>
			{imageUrl && (
				<Link
					href={firstTargetHref}
					className={styles.cover}
				>
					<Image
						width={120}
						height={120}
						src={imageUrl}
						alt={firstTargetHref}
					/>
				</Link>
			)}
		</div>
	)
}
