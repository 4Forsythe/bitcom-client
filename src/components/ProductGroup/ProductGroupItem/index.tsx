'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { AddCartButton, PriceBadge, ProductImage } from '@/components'

import { useCart } from '@/hooks/useCart'
import { useCartStore } from '@/store/cart'
import { useCreateCartItem } from '@/hooks/useCreateCartItem'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { calcProductPriceValue } from '@/utils/calc-product-price-value'

import type { ProductType } from '@/types/product.types'

import styles from './product-group-item.module.scss'

export const ProductGroupItem: React.FC<ProductType> = ({
	id,
	slug,
	name,
	images,
	price,
	discountPrice,
	category,
	isArchived
}) => {
	const router = useRouter()
	const [isMounted, setIsMounted] = React.useState(false)

	const { isCartLoading, isCartSuccess } = useCart()
	const { items: cart } = useCartStore()

	const isInCart = cart.find((item) => item.product.id === id)

	const { createCartItem, isCreateCartItemPending } = useCreateCartItem()

	const onAddCartItem = () => {
		isInCart ? router.push(ROUTE.CART) : createCartItem({ productId: id })
	}

	const imageSrc =
		images.length > 0
			? `${SERVER_BASE_URL}/${images[0].url}`
			: category.imageUrl
				? `/static/${category.imageUrl}`
				: undefined

	const discountValue = calcProductPriceValue(price, discountPrice)

	React.useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<div className={styles.container}>
			<Link
				className={styles.cover}
				href={`${ROUTE.PRODUCT}/${slug}`}
			>
				{isArchived && (
					<div className={styles.overlay}>
						<h5 className={styles.overlayTitle}>Нет в наличии</h5>
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
			</Link>
			<div className={styles.information}>
				<Link
					className={styles.name}
					href={`${ROUTE.PRODUCT}/${slug}`}
				>
					{name}
				</Link>
				<div className={styles.details}>
					<Link
						className={styles.price}
						href={`${ROUTE.PRODUCT}/${slug}`}
					>
						<PriceBadge
							price={price}
							discountPrice={discountValue}
						/>
					</Link>
					{isMounted && !isArchived && !isCartLoading && isCartSuccess && (
						<AddCartButton
							className={styles.cartButton}
							variant={isInCart ? 'outlined' : 'contained'}
							isLoading={isCreateCartItemPending}
							onClick={(event) => {
								event.preventDefault()
								event.stopPropagation()
								onAddCartItem()
							}}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export { ProductGroupItemSkeleton } from './skeleton'
