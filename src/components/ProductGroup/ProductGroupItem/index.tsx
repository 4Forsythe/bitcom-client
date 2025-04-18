'use client'

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
	const [hasImageError, setHasImageError] = React.useState(false)
	const [isImageLoading, setIsImageLoading] = React.useState(true)

	const [imageSrc, setImageSrc] = React.useState<string>(
		imageUrl
			? `${SERVER_BASE_URL}/${imageUrl}`
			: '/static/image-placeholder.png'
	)

	const handleImageError = () => {
		setHasImageError(true)
		setImageSrc(
			category?.imageUrl
				? `/static/${category.imageUrl}`
				: '/static/image-placeholder.png'
		)
	}

	return (
		<Link
			className={styles.container}
			href={`${ROUTE.PRODUCT}/${id}`}
		>
			<div className={clsx(styles.cover, { [styles.loaded]: isImageLoading })}>
				<Image
					className={clsx(styles.image, {
						[styles.placeholder]: !imageUrl && !category?.imageUrl,
						[styles.categoryImage]:
							(!imageUrl || hasImageError) && category?.imageUrl
					})}
					width={350}
					height={150}
					src={
						imageUrl
							? imageSrc
							: category?.imageUrl
								? `/static/${category.imageUrl}`
								: '/static/image-placeholder.png'
					}
					placeholder='blur'
					blurDataURL={'/static/image-placeholder.png'}
					alt={name}
					onLoad={() => setIsImageLoading(false)}
					onError={handleImageError}
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
