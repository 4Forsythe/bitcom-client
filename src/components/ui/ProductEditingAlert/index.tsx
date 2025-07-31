import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { InfoBlock } from '@/components'
import { ProductImage } from '@/components/ProductImage'

import type { ProductType } from '@/types/product.types'

import styles from './product-editing-alert.module.scss'
import { findLatestCategory } from '@/utils/find-latest-category'

interface Props {
	product: ProductType
}

export const ProductEditingAlert: React.FC<Props> = ({ product }) => {
	const { id, slug, name, images, count, price, category } = product

	const latestCategory = product.category
		? findLatestCategory(product.category)
		: undefined

	const imageSrc =
		images.length > 0
			? `${SERVER_BASE_URL}/${images[0].url}`
			: latestCategory?.imageUrl
				? `/static/${latestCategory.imageUrl}`
				: undefined

	return (
		<div className={styles.container}>
			<p className={styles.heading}>
				Обратите внимание: Вы редактируете товар!
			</p>
			<Link
				className={styles.thumbnail}
				href={`${ROUTE.PRODUCT}/${slug}`}
				target='_blank'
			>
				<div className={styles.cover}>
					<ProductImage
						src={imageSrc}
						isPlaceholder={!images.length && !!latestCategory?.imageUrl}
						width={100}
						height={100}
						size='thumbnail'
						alt={name}
					/>
				</div>
				<div className={styles.thumbnailInfo}>
					<p className={styles.text}>{name}</p>
					<div className={styles.thumbnailDetails}>
						<span className={styles.price}>
							{+price > 0 ? `${price} ₽` : 'Цена по запросу'}
						</span>
						<span
							className={clsx(styles.availables, {
								[styles.positive]: count !== 0,
								[styles.negative]: count === 0,
								[styles.warning]: count && count > 0 && count < 5
							})}
						>
							{count || count === 0
								? `На складе ${count} шт.`
								: 'Есть в наличии'}
						</span>
					</div>
				</div>
			</Link>
		</div>
	)
}
