import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { ProductImage } from '../ProductImage'
import { PriceBadge, ProductManagerControls } from '../ui'
import { ArchiveListItemSkeleton } from './skeleton'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { calcDiscountPercent } from '@/utils/calc-discount-price'
import { calcMaxDiscountValue } from '@/utils/calc-max-discount-value'

import type { ProductType } from '@/types/product.types'

import styles from './archive-list-item.module.scss'

export const ArchiveListItem: React.FC<ProductType> = ({
	id,
	slug,
	name,
	description,
	images,
	discountTargets,
	count,
	price,
	discountPrice,
	category,
	isArchived,
	isPublished
}) => {
	const imageSrc =
		images.length > 0
			? `${SERVER_BASE_URL}/${images[0].url}`
			: category.imageUrl
				? `/static/${category.imageUrl}`
				: undefined

	const isDiscountAvailable =
		discountTargets.length > 0 &&
		new Date(discountTargets[0].discount.expiresAt) > new Date()

	const discountTarget = isDiscountAvailable
		? {
				type: discountTargets[0].discount.type,
				amount: discountTargets[0].discount.amount
			}
		: null

	const discountValue = calcMaxDiscountValue(
		price,
		discountPrice,
		discountTarget
	)

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
				<PriceBadge
					size='small'
					price={price}
					discountPrice={discountValue}
				/>
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
						productId={id}
						isArchived={isArchived}
						isPublished={isPublished}
					/>
				</div>
			</div>
		</article>
	)
}

export { ArchiveListItemSkeleton }
