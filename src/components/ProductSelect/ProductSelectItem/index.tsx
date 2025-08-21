'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { SquareArrowOutUpRight } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { Checkbox, PriceBadge, ProductImage } from '@/components'

import type { ProductType } from '@/types/product.types'

import styles from './product-select-item.module.scss'

interface Props {
	product: ProductType
	discountPrice: string | number
	isSelected?: boolean
	onSelect: (item: ProductType) => void
}

export const ProductSelectItem = React.memo(
	React.forwardRef<HTMLDivElement, Props>(
		({ product, discountPrice, isSelected, onSelect }, ref) => {
			const defaultPrice = product.discountPrice
				? Number(product.discountPrice)
				: Number(product.price)

			const imageSrc =
				product.images.length > 0
					? `${SERVER_BASE_URL}/${product.images[0].url}`
					: product.category.imageUrl
						? `/static/${product.category.imageUrl}`
						: undefined

			return (
				<div
					ref={ref}
					className={clsx(styles.container, { [styles.selected]: isSelected })}
					onClick={() => onSelect(product)}
				>
					<Link
						className={styles.link}
						href={`${ROUTE.PRODUCT}/${product.slug}`}
						target='_blank'
						onClick={(event) => event.stopPropagation()}
					>
						<SquareArrowOutUpRight
							className={styles.icon}
							size={16}
						/>
					</Link>
					<Checkbox
						className={styles.checkbox}
						checked={isSelected}
						onChange={() => onSelect(product)}
					/>
					<Link
						href={`${ROUTE.PRODUCT}/${product.slug}`}
						target='_blank'
						onClick={(event) => event.stopPropagation()}
					>
						<ProductImage
							className={styles.image}
							src={imageSrc}
							isPlaceholder={
								!product.images.length && !!product.category.imageUrl
							}
							width={120}
							height={120}
							size='thumbnail'
							alt={product.name}
						/>
					</Link>
					<span className={styles.title}>{product.name}</span>
					<PriceBadge
						className={styles.pricetab}
						size='small'
						price={defaultPrice}
						discountPrice={isSelected ? discountPrice : undefined}
					/>
				</div>
			)
		}
	)
)

ProductSelectItem.displayName = 'ProductSelectItem'
