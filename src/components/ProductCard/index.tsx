'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import { ProductCardSkeleton } from './skeleton'
import {
	Button,
	AddWishlistButton,
	ProductImage,
	PriceBadge,
	DiscountBadge,
	Badge
} from '@/components'
import { ViewType } from '@/components/ProductList'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { calcDiscountPercent } from '@/utils/calc-discount-percent'
import { calcProductPriceValue } from '@/utils/calc-product-price-value'

import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useCreateCartItem } from '@/hooks/useCreateCartItem'
import { useCreateWishlistItem } from '@/hooks/useCreateWishlistItem'

import type { ProductType } from '@/types/product.types'

import styles from './product-card.module.scss'

type IProductCard = ProductType & {
	variant?: ViewType
}

export const ProductCard: React.FC<IProductCard> = ({
	id,
	slug,
	name,
	images,
	price,
	discountPrice,
	discount,
	count,
	isArchived,
	category,
	variant = ViewType.SIMPLE
}) => {
	const router = useRouter()

	const { isCartLoading } = useCart()
	const { isWishlistLoading } = useWishlist()

	const { items: cart } = useCartStore()
	const { items: wishlist } = useWishlistStore()

	const isLoading = isCartLoading || isWishlistLoading

	const isInCart = cart.find((item) => item.product.id === id)
	const isInWishlist = wishlist.find((item) => item.product.id === id)

	const imageSrc =
		images.length > 0
			? `${SERVER_BASE_URL}/${images[0].url}`
			: category.imageUrl
				? `/static/${category.imageUrl}`
				: undefined

	const { createCartItem, isCreateCartItemPending } = useCreateCartItem()
	const { createWishlistItem, isCreateWishlistItemPending } =
		useCreateWishlistItem()

	const onAddCartItem = () => {
		isInCart ? router.push(ROUTE.CART) : createCartItem({ productId: id })
	}

	const onAddWishlistItem = () => {
		createWishlistItem({ productId: id })
	}

	if (isLoading) {
		return <ProductCardSkeleton />
	}

	const discountValue = calcProductPriceValue(price, discountPrice)

	// const descriptionHtml = description
	// 	? description.replace(/\\n/g, '<br />').replace(/\n/g, '<br />')
	// 	: 'Описание отсуствует'

	return (
		<article
			className={clsx(styles.container, 'animate-opacity', {
				[styles.tile]: variant === ViewType.TILE
			})}
		>
			<Link
				className={styles.cover}
				href={`${ROUTE.PRODUCT}/${slug}`}
			>
				{discountValue && Number(discountValue) < Number(price) && (
					<div className={styles.discountPercentTab}>
						-{calcDiscountPercent(Number(price), Number(discountValue))}%
					</div>
				)}
				<ProductImage
					src={imageSrc}
					isPlaceholder={!images.length && !!category.imageUrl}
					width={400}
					height={400}
					alt={name}
				/>
			</Link>
			<div className={styles.information}>
				<Link
					className={styles.title}
					href={`${ROUTE.PRODUCT}/${slug}`}
				>
					{name}
				</Link>
				<div className={styles.meta}>
					{!isArchived && discount && (
						<DiscountBadge
							discountId={discount.id}
							iconUrl='/icons/Fire.gif'
							expiredAt={discount.expiresAt}
						/>
					)}
					{category && (
						<Link
							className={styles.type}
							href={`${ROUTE.CATALOG}/${category.id}`}
						>
							{category.name}
						</Link>
					)}
				</div>
				{/* <p
					className={styles.description}
					dangerouslySetInnerHTML={{
						__html: descriptionHtml
					}}
				/> */}
			</div>
			<div className={styles.details}>
				<div className={styles.avails}>
					<PriceBadge
						size='small'
						price={price}
						discountPrice={discountValue}
					/>
					{!isArchived && (
						<Badge
							size='sm'
							color={
								count !== 0
									? 'green'
									: count === 0
										? 'red'
										: count && count > 0 && count < 5
											? 'orange'
											: 'grey'
							}
						>
							{count || count === 0
								? `На складе ${count} шт.`
								: 'Есть в наличии'}
						</Badge>
					)}
				</div>
				{!isLoading && (
					<div className={styles.controls}>
						<AddWishlistButton
							variant={isInWishlist ? 'contained' : 'outlined'}
							onClick={onAddWishlistItem}
							isLoading={isCreateWishlistItemPending}
						/>
						<Button
							variant={isInCart ? 'outlined' : 'contained'}
							onClick={onAddCartItem}
							isLoading={isCreateCartItemPending}
						>
							{isInCart ? 'В корзине' : 'В корзину'}
						</Button>
					</div>
				)}
			</div>
		</article>
	)
}

export { ProductCardSkeleton } from './skeleton'
