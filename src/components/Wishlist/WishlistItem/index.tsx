'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import {
	Button,
	AddWishlistButton,
	ProductImage,
	PriceBadge,
	Badge
} from '@/components'

import { useCart } from '@/hooks/useCart'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { useCreateCartItem } from '@/hooks/useCreateCartItem'
import { useCreateWishlistItem } from '@/hooks/useCreateWishlistItem'
import { useDeleteCartItem } from '@/hooks/useDeleteCartItem'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { calcDiscountPercent } from '@/utils/calc-discount-percent'
import { calcProductPriceValue } from '@/utils/calc-product-price-value'

import type { WishlistItemType } from '@/types/wishlist.types'

import styles from './wishlist-item.module.scss'

export const WishlistItem: React.FC<WishlistItemType> = ({ id, product }) => {
	const imageSrc =
		product.images.length > 0
			? `${SERVER_BASE_URL}/${product.images[0].url}`
			: product.category.imageUrl
				? `/static/${product.category.imageUrl}`
				: undefined

	const count = product.count

	const { isCartLoading } = useCart()

	const { items: cart, archived: archivedCart } = useCartStore()
	const { items: wishlist, archived: archivedWishlist } = useWishlistStore()

	const isInCart = cart
		.concat(archivedCart)
		.find((item) => item.product.id === product.id)
	const isInWishlist = wishlist
		.concat(archivedWishlist)
		.find((item) => item.product.id === product.id)

	const { createCartItem, isCreateCartItemPending } = useCreateCartItem()
	const { deleteCartItem, isDeleteCartItemPending } = useDeleteCartItem()

	const { createWishlistItem, isCreateWishlistItemPending } =
		useCreateWishlistItem()

	const onAddWishlistItem = () => {
		createWishlistItem({ productId: product.id })
	}

	const onAddCartItem = () => {
		isInCart
			? deleteCartItem(isInCart.id)
			: createCartItem({ productId: product.id })
	}

	const { price, discountPrice } = product

	const discountValue = calcProductPriceValue(price, discountPrice)

	// const descriptionHtml = product.description
	// 	? product.description.replace(/\\n/g, '<br />').replace(/\n/g, '<br />')
	// 	: 'Описание отсуствует'

	return (
		<article className={clsx(styles.container, 'animate-opacity')}>
			{product.isArchived && (
				<div className={styles.overlay}>
					<h5 className={styles.overlayTitle}>Нет в наличии</h5>
				</div>
			)}
			<div className={styles.inner}>
				<Link
					href={`${ROUTE.PRODUCT}/${product.slug}`}
					className={styles.cover}
				>
					{discountValue && Number(discountValue) < Number(price) && (
						<div className={styles.discount}>
							-{calcDiscountPercent(Number(price), Number(discountValue))}%
						</div>
					)}
					<ProductImage
						src={imageSrc}
						isPlaceholder={
							!product.images.length && !!product.category.imageUrl
						}
						width={450}
						height={450}
						alt={product.name}
						priority
					/>
				</Link>
				<div className={styles.information}>
					<Link
						className={styles.title}
						href={`${ROUTE.PRODUCT}/${product.slug}`}
					>
						{product.name}
					</Link>
					{product.category && (
						<Link
							className={styles.type}
							href={`${ROUTE.CATALOG}/${product.category.id}`}
						>
							{product.category.name}
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
				{!product.isArchived && (
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
						{count || count === 0 ? `На складе ${count} шт.` : 'Есть в наличии'}
					</Badge>
				)}
				<div className={styles.controls}>
					<AddWishlistButton
						variant={isInWishlist ? 'contained' : 'outlined'}
						onClick={onAddWishlistItem}
						isLoading={isCreateWishlistItemPending}
					/>
					<Button
						variant={isInCart ? 'outlined' : 'contained'}
						isLoading={
							isCartLoading ||
							isCreateCartItemPending ||
							isDeleteCartItemPending
						}
						onClick={onAddCartItem}
					>
						{isInCart ? 'Убрать из корзины' : 'Добавить в корзину'}
					</Button>
				</div>
			</div>
		</article>
	)
}

export { WishlistItemSkeleton } from './skeleton'
