import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'

import type { ProductType } from '@/types/product.types'

import styles from './product-group-item.module.scss'

export const ProductGroupItem: React.FC<ProductType> = ({
	id,
	name,
	count,
	price,
	imageUrl,
	category
}) => {
	return (
		<Link
			className={clsx(styles.container, 'animate-bounce')}
			href={`${ROUTE.PRODUCT}/${id}`}
		>
			<div className={styles.cover}>
				<Image
					className={clsx(styles.image, {
						[styles.placeholder]: !imageUrl && !category?.imageUrl,
						[styles.categoryImage]: !imageUrl && category?.imageUrl
					})}
					width={200}
					height={200}
					src={
						imageUrl
							? `${SERVER_BASE_URL}/${imageUrl}`
							: category?.imageUrl
								? `/static/${category.imageUrl}`
								: '/static/image-placeholder.png'
					}
					placeholder='blur'
					blurDataURL='/static/image-placeholder.png'
					alt={name}
					priority
				/>
			</div>
			<div className={styles.information}>
				<h1 className={styles.name}>{name}</h1>
				<div className={styles.details}>
					<span className={styles.text}>В наличии {count} шт.</span>
					<span className={styles.price}>
						{+price > 0 ? `${price} ₽` : 'Цена по запросу'}
					</span>
				</div>
			</div>
		</Link>
	)
}

export { ProductGroupItemSkeleton } from './skeleton'
