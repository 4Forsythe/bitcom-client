'use client'

import React from 'react'
import clsx from 'clsx'
import { useSwiper } from 'swiper/react'

import { ProductImage } from '@/components/ProductImage'
import { SERVER_BASE_URL } from '@/constants'

import type { ProductImageType } from '@/types/product.types'
import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './product-image-gallery.module.scss'

interface Props {
	images: ProductImageType[]
	activeIndex: number
	category?: ProductCategoryType
	alt: string
	setActiveIndex: (index: number) => void
}

export const ProductImageGalleryPagination: React.FC<Props> = ({
	images,
	activeIndex,
	category,
	alt,
	setActiveIndex
}) => {
	const swiper = useSwiper()

	return (
		<div className={styles.pagination}>
			<div className={styles.list}>
				{images.map((image, index) => (
					<ProductImage
						key={image.id}
						src={
							image
								? `${SERVER_BASE_URL}/${image.url}`
								: category?.imageUrl
									? `/static/${category.imageUrl}`
									: undefined
						}
						isPlaceholder={!image && !!category?.imageUrl}
						width={75}
						height={55}
						size='thumbnail'
						alt={`${alt} ${index + 1}`}
						className={clsx(styles.listItem, {
							[styles.target]: activeIndex === index
						})}
						onClick={() => {
							setActiveIndex(index)
							swiper.slideToLoop(index)
						}}
					/>
				))}
			</div>
		</div>
	)
}
