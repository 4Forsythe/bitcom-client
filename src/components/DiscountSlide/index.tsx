'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '../ui'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { calcTimeBetweenDates } from '@/utils/calc-time-between-dates'

import {
	type DiscountType,
	DiscountTypeVariables
} from '@/types/discount.types'

import styles from './discount-slide.module.scss'

export const DiscountSlide: React.FC<DiscountType> = ({
	id,
	type,
	amount,
	targets,
	expiresAt
}) => {
	const firstTarget = targets.length > 0 ? targets[0] : null

	if (!firstTarget) {
		return null
	}

	const isProduct = firstTarget.product

	const price = isProduct
		? new Intl.NumberFormat('ru-RU').format(Number(isProduct.price))
		: null

	const discountPrice = isProduct
		? new Intl.NumberFormat('ru-RU').format(
				Number(isProduct.price) -
					(Number(isProduct.price) / 100) * Number(amount)
			)
		: null

	const expires = calcTimeBetweenDates(new Date(), new Date(expiresAt))

	const imageUrl = isProduct
		? isProduct.images.length > 0
			? `${SERVER_BASE_URL}/${isProduct.images[0].url}`
			: isProduct.category.imageUrl
				? `/static/${isProduct.category.imageUrl}`
				: undefined
		: firstTarget.category && firstTarget.category.imageUrl
			? `/static/${firstTarget.category.imageUrl}`
			: undefined

	const firstTargetHref = firstTarget.product
		? `${ROUTE.PRODUCT}/${firstTarget.product.slug}`
		: `${ROUTE.CATALOG}/${firstTarget.categoryId}`

	return (
		<div className={styles.container}>
			<span className={styles.title}>
				Скидка: {expires === 0 ? 'скоро закончится' : `еще ${expires}`}
			</span>
			<Link
				href={firstTargetHref}
				className={styles.targetLink}
			>
				{isProduct ? isProduct.name : firstTarget.category?.name}
			</Link>

			{type === DiscountTypeVariables.PERCENT && !isProduct ? (
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
