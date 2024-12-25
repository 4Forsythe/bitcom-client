'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import clsx from 'clsx'

import { ProductCardSkeleton } from './skeleton'
import { Button, AddWishlistButton } from '@/components'

import { ListView } from '../ProductList'
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
	variant?: ListView
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
	variant = ListView.SIMPLE
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

	return (
		<article
			className={clsx(styles.container, 'animate-opacity', {
				[styles.tile]: variant === ListView.TILE
			})}
		>
			<Link
				className={styles.cover}
				href={`${ROUTE.PRODUCT}/${id}`}
			>
				<Image
					className={styles.image}
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
				{variant === ListView.SIMPLE && (
					<p className={styles.description}>
						{description || 'Описание отсутствует'}
					</p>
				)}
			</div>
			<div className={styles.details}>
				<div className={styles.avails}>
					<p className={styles.price}>{price} ₽</p>
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
