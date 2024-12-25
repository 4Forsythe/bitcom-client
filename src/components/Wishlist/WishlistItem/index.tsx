'use client'

import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'

import { Button, AddWishlistButton } from '@/components'

import { useCart } from '@/hooks/useCart'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { useCreateCartItem } from '@/hooks/useCreateCartItem'
import { useCreateWishlistItem } from '@/hooks/useCreateWishlistItem'
import { useDeleteCartItem } from '@/hooks/useDeleteCartItem'

import { ROUTE } from '@/config/routes.config'
import type { WishlistItemType } from '@/types/wishlist.types'

import styles from './wishlist-item.module.scss'
import { SERVER_BASE_URL } from '@/constants'

export const WishlistItem: React.FC<WishlistItemType> = ({ id, product }) => {
	const { isCartLoading } = useCart()

	const { items: cart } = useCartStore()
	const { items: wishlist } = useWishlistStore()

	const isInCart = cart.find((item) => item.product.id === product.id)
	const isInWishlist = wishlist.find((item) => item.product.id === product.id)

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

	return (
		<article className={clsx(styles.container, 'animate-opacity')}>
			<Link
				className={styles.cover}
				href={`${ROUTE.PRODUCT}/${product.id}`}
			>
				<Image
					className={styles.image}
					width={1000}
					height={1000}
					src={
						product.imageUrl
							? `${SERVER_BASE_URL}/${product.imageUrl}`
							: product.category?.imageUrl
								? `/static/${product.category.imageUrl}`
								: '/static/image-placeholder.png'
					}
					placeholder='blur'
					blurDataURL='/static/image-placeholder.png'
					alt={product.name}
					priority
				/>
			</Link>
			<div className={styles.information}>
				<Link
					className={styles.title}
					href={`${ROUTE.PRODUCT}/${product.id}`}
				>
					{product.name}
				</Link>
				{product.device && (
					<Link
						className={styles.type}
						href={`${ROUTE.SEARCH}?device=${product.device.id}`}
					>
						{product.device.name}
					</Link>
				)}
				<p className={styles.description}>
					{product.description || 'Описание отсутствует'}
				</p>
			</div>
			<div className={styles.details}>
				<p className={styles.price}>{product.price} ₽</p>
				<span className={styles.count}>В наличии {product.count} шт.</span>
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
