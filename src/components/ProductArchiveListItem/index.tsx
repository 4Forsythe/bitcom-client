import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { ProductImage } from '../ProductImage'
import { ArchiveListItemSkeleton } from './skeleton'
import { PriceBadge, PriceBadgeForm, ProductManagerControls } from '../ui'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { calcDiscountPercent } from '@/utils/calc-discount-percent'
import { calcProductPriceValue } from '@/utils/calc-product-price-value'

import type { ProductType } from '@/types/product.types'

import styles from './product-archive-list-item.module.scss'

export const ProductArchiveListItem: React.FC<ProductType> = (props) => {
	const {
		id,
		slug,
		name,
		images,
		count,
		price,
		discountPrice,
		discount,
		category,
		isArchived,
		isPublished
	} = props

	const imageSrc =
		images.length > 0
			? `${SERVER_BASE_URL}/${images[0].url}`
			: category.imageUrl
				? `/static/${category.imageUrl}`
				: undefined

	const discountValue = calcProductPriceValue(price, discountPrice)

	// const descriptionHtml = description
	// 	? description.replace(/\\n/g, '<br />').replace(/\n/g, '<br />')
	// 	: 'Описание отсуствует'

	return (
		<article className={clsx(styles.container, 'animate-opacity')}>
			<div className={styles.inner}>
				<Link
					href={`${ROUTE.PRODUCT}/${slug}`}
					className={styles.cover}
				>
					{isArchived && (
						<div className={styles.thumbnail}>
							<span className={styles.thumbnailTitle}>В архиве</span>
						</div>
					)}
					{discountValue && Number(discountValue) < Number(price) && (
						<div className={styles.discount}>
							-{calcDiscountPercent(Number(price), Number(discountValue))}%
						</div>
					)}
					<ProductImage
						src={imageSrc}
						isPlaceholder={!images.length && !!category.imageUrl}
						width={300}
						height={300}
						size='small'
						alt={name}
						priority
					/>
				</Link>
				<div className={styles.information}>
					<Link
						className={styles.title}
						href={`${ROUTE.PRODUCT}/${slug}`}
					>
						{isPublished ? name : `${name} (черновик)`}
					</Link>
					{category && (
						<Link
							className={styles.type}
							href={`${ROUTE.CATALOG}/${category.id}`}
						>
							{category.name}
						</Link>
					)}
					{/* <p
						className={styles.description}
						dangerouslySetInnerHTML={{
							__html: descriptionHtml
						}}
					/> */}
				</div>
			</div>
			<div className={styles.details}>
				{!discount ? (
					<PriceBadgeForm
						size='small'
						productId={id}
						price={price}
						discountPrice={discountValue}
					/>
				) : (
					<PriceBadge
						size='small'
						price={price}
						discountPrice={discountValue}
					/>
				)}
				<span
					className={clsx(styles.breadcrumb, {
						[styles.positive]: count !== 0,
						[styles.negative]: count === 0,
						[styles.warning]: count && count > 0 && count < 5
					})}
				>
					{count || count === 0 ? `На складе ${count} шт.` : 'Есть в наличии'}
				</span>

				<div className={styles.controls}>
					<ProductManagerControls
						size='small'
						product={props}
					/>
				</div>
			</div>
		</article>
	)
}

export { ArchiveListItemSkeleton }
