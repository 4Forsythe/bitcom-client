'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import clsx from 'clsx'

import { ProductCardSkeleton } from './skeleton'
import { Button, AddWishlistButton } from '@/components'
import { ViewType } from '@/components/ProductList'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'

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
	name,
	description,
	price,
	count,
	imageUrl,
	category,
	device,
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
				href={`${ROUTE.PRODUCT}/${id}`}
			>
				<Image
					className={clsx(styles.image, {
						[styles.placeholder]: !imageUrl
					})}
					width={450}
					height={450}
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
			</Link>
			<div className={styles.information}>
				<Link
					className={styles.title}
					href={`${ROUTE.PRODUCT}/${id}`}
				>
					{name}
				</Link>
				{device && (
					<Link
						className={styles.type}
						href={`${ROUTE.SEARCH}?device=${device.id}`}
					>
						{device.name}
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
					<p className={styles.price}>
						{+price > 0 ? `${price} ₽` : 'Цена по запросу'}
					</p>
					<span className={styles.count}>В наличии {count} шт.</span>
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
