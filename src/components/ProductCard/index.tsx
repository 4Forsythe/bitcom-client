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
	PriceBadge
} from '@/components'
import { ViewType } from '@/components/ProductList'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { calcDiscountPercent } from '@/utils/calc-discount-price'

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
	description,
	images,
	price,
	discountPrice,
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

	const descriptionHtml = description
		? description.replace(/\\n/g, '<br />').replace(/\n/g, '<br />')
		: 'Описание отсуствует'

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
				{discountPrice && Number(discountPrice) < Number(price) && (
					<div className={styles.discount}>
						-{calcDiscountPercent(Number(price), Number(discountPrice))}%
					</div>
				)}
				<ProductImage
					src={imageSrc}
					isPlaceholder={!images.length && !!category.imageUrl}
					width={400}
					height={250}
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
				{category && (
					<Link
						className={styles.type}
						href={`${ROUTE.CATALOG}/${category.id}`}
					>
						{category.name}
					</Link>
				)}
				<p
					className={styles.description}
					dangerouslySetInnerHTML={{
						__html: descriptionHtml
					}}
				/>
			</div>
			<div className={styles.details}>
				<div className={styles.avails}>
					<PriceBadge
						size='small'
						price={price}
						discountPrice={discountPrice}
					/>
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
