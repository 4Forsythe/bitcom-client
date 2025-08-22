'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import {
	Button,
	AddWishlistButton,
	ProductImage,
	PriceBadge
} from '@/components'

import { useCart } from '@/hooks/useCart'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { useCreateCartItem } from '@/hooks/useCreateCartItem'
import { useCreateWishlistItem } from '@/hooks/useCreateWishlistItem'
import { useDeleteCartItem } from '@/hooks/useDeleteCartItem'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { calcDiscountPercent } from '@/utils/calc-discount-price'

import type { WishlistItemType } from '@/types/wishlist.types'

import styles from './wishlist-item.module.scss'
import { calcMaxDiscountValue } from '@/utils/calc-max-discount-value'

export const WishlistItem: React.FC<WishlistItemType> = ({ id, product }) => {
	const imageSrc =
		product.images.length > 0
			? `${SERVER_BASE_URL}/${product.images[0].url}`
			: product.category.imageUrl
				? `/static/${product.category.imageUrl}`
				: undefined

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

	const { price, discountPrice, discountTargets } = product

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
					<span
						className={clsx(styles.breadcrumb, {
							[styles.positive]: product.count !== 0,
							[styles.negative]: product.count === 0,
							[styles.warning]:
								product.count && product.count > 0 && product.count < 5
						})}
					>
						{product.count || product.count === 0
							? `На складе ${product.count} шт.`
							: 'Есть в наличии'}
					</span>
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
