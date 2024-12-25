'use client'

import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { Minus, Plus, Heart, Trash } from 'lucide-react'

import { useWishlistStore } from '@/store/wishlist'
import { useWishlist } from '@/hooks/useWishlist'
import { useUpdateCartItem } from '@/hooks/useUpdateCartItem'
import { useDeleteCartItem } from '@/hooks/useDeleteCartItem'
import { useCreateWishlistItem } from '@/hooks/useCreateWishlistItem'

import { SERVER_BASE_URL } from '@/constants'
import { ROUTE } from '@/config/routes.config'
import type { CartItemType } from '@/types/cart.types'

import styles from './cart-item.module.scss'

export const CartItem: React.FC<CartItemType> = ({ id, product, count }) => {
	const { isWishlistLoading } = useWishlist()
	const { items: wishlist } = useWishlistStore()

	const { updateCartItem, isUpdateCartItemPending } = useUpdateCartItem()
	const { deleteCartItem, isDeleteCartItemPending } = useDeleteCartItem()
	const { createWishlistItem, isCreateWishlistItemPending } =
		useCreateWishlistItem()

	const isLoading =
		isUpdateCartItemPending ||
		isDeleteCartItemPending ||
		isCreateWishlistItemPending

	const isInWishlist = wishlist.some((item) => item.product.id === product.id)

	const onAddWishlistItem = () => {
		createWishlistItem({ productId: product.id })
	}

	const increment = () => {
		if (product.count > count) {
			updateCartItem({
				id,
				data: { productId: product.id }
			})
		}
	}

	const decrement = () => {
		if (count >= 1) {
			updateCartItem({
				id,
				data: { productId: product.id, count: --count }
			})
		}
	}

	return (
		<div
			className={clsx(styles.container, 'animate-opacity', {
				[styles.negative]: !product.count
			})}
		>
			<div className={styles.inner}>
				<div className={styles.cover}>
					<Link
						className={styles.link}
						href={`${ROUTE.PRODUCT}/${product.id}`}
					>
						<Image
							className={styles.image}
							width={100}
							height={100}
							src={
								product.imageUrl
									? `${SERVER_BASE_URL}/${product.imageUrl}`
									: '/static/image-placeholder.png'
							}
							placeholder='blur'
							blurDataURL='/static/image-placeholder.png'
							alt={product.name}
							priority
						/>
					</Link>
					<span className={styles.barcode}>{product.barcode[0]}</span>
				</div>
				<div className={styles.information}>
					<Link
						className={styles.title}
						href={`${ROUTE.PRODUCT}/${product.id}`}
					>
						{product.name}
					</Link>
					<div className={styles.counter}>
						<button
							className={styles.control}
							type='button'
							disabled={isLoading}
							onClick={decrement}
						>
							<Minus size={18} />
						</button>
						<span className={styles.count}>{count}</span>
						<button
							className={styles.control}
							type='button'
							disabled={isLoading}
							onClick={increment}
						>
							<Plus size={18} />
						</button>
					</div>
					<span className={styles.avails}>
						{product.count
							? `В наличии: ${product.count} шт.`
							: 'Нет в наличии'}
					</span>
				</div>
			</div>
			<div className={styles.meta}>
				<div className={styles.menu}>
					<button
						className={clsx(styles.action, { [styles.active]: isInWishlist })}
						type='button'
						disabled={isWishlistLoading || isLoading}
						onClick={onAddWishlistItem}
					>
						<Heart size={18} />
					</button>
					<button
						className={styles.action}
						type='button'
						disabled={isLoading}
						onClick={() => deleteCartItem(id)}
					>
						<Trash size={18} />
					</button>
				</div>
				<span className={styles.price}>{product.price} ₽</span>
			</div>
		</div>
	)
}

export { CartItemSkeleton } from './skeleton'
