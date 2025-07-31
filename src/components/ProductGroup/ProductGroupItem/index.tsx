'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'

import type { ProductType } from '@/types/product.types'

import styles from './product-group-item.module.scss'
import { calcDiscountPercent } from '@/utils/calc-discount-price'
import { ProductImage } from '@/components/ProductImage'
import { PriceBadge } from '@/components/ui'

export const ProductGroupItem: React.FC<ProductType> = ({
	id,
	slug,
	name,
	images,
	price,
	discountPrice,
	count,
	category,
	isArchived
}) => {
	const imageSrc =
		images.length > 0
			? `${SERVER_BASE_URL}/${images[0].url}`
			: category.imageUrl
				? `/static/${category.imageUrl}`
				: undefined

	return (
		<Link
			className={styles.container}
			href={`${ROUTE.PRODUCT}/${slug}`}
		>
			<div className={styles.cover}>
				{isArchived && (
					<div className={styles.overlay}>
						<h5 className={styles.overlayTitle}>Нет в наличии</h5>
					</div>
				)}
				{discountPrice && Number(discountPrice) < Number(price) && (
					<div className={styles.discount}>
						-{calcDiscountPercent(Number(price), Number(discountPrice))}%
					</div>
				)}
				<ProductImage
					src={imageSrc}
					isPlaceholder={!images.length && !!category.imageUrl}
					width={450}
					height={450}
					alt={name}
					size='medium'
					priority
				/>
			</div>
			<div className={styles.information}>
				<h1 className={styles.name}>{name}</h1>
				<div className={styles.details}>
					{!isArchived && (
						<span
							className={clsx(styles.breadcrumb, {
								[styles.positive]: count !== 0,
								[styles.negative]: count === 0,
								[styles.warning]: count && count > 0 && count < 5
							})}
						>
							{count || count === 0
								? `На складе ${count} шт.`
								: 'Есть в наличии'}
						</span>
					)}
					<PriceBadge
						size='small'
						price={price}
						discountPrice={discountPrice}
					/>
				</div>
			</div>
		</Link>
	)
}

export { ProductGroupItemSkeleton } from './skeleton'
