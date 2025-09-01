'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Minus, Plus, Heart, Trash } from 'lucide-react'

import { Badge, PriceBadge } from '../ui'
import { ProductImage } from '../ProductImage'
import { useWishlistStore } from '@/store/wishlist'
import { useWishlist } from '@/hooks/useWishlist'
import { useUpdateCartItem } from '@/hooks/useUpdateCartItem'
import { useDeleteCartItem } from '@/hooks/useDeleteCartItem'
import { useCreateWishlistItem } from '@/hooks/useCreateWishlistItem'

import { SERVER_BASE_URL } from '@/constants'
import { ROUTE } from '@/config/routes.config'
import { calcDiscountPercent } from '@/utils/calc-discount-percent'
import { calcNounDeclension } from '@/utils/calc-noun-declension'
import { calcProductPriceValue } from '@/utils/calc-product-price-value'

import type { CartItemType } from '@/types/cart.types'

import styles from './cart-item.module.scss'
import toast from 'react-hot-toast'

export const CartItem: React.FC<CartItemType> = ({ id, product, count }) => {
	const { isWishlistLoading } = useWishlist()
	const { items: wishlist, archived: archivedWishlist } = useWishlistStore()

	const imageSrc =
		product.images.length > 0
			? `${SERVER_BASE_URL}/${product.images[0].url}`
			: product.category.imageUrl
				? `/static/${product.category.imageUrl}`
				: undefined

	const { price, discountPrice } = product

	const discountValue = calcProductPriceValue(price, discountPrice)

	const { updateCartItem, isUpdateCartItemPending } = useUpdateCartItem()
	const { deleteCartItem, isDeleteCartItemPending } = useDeleteCartItem()
	const { createWishlistItem, isCreateWishlistItemPending } =
		useCreateWishlistItem()

	const isLoading =
		isUpdateCartItemPending ||
		isDeleteCartItemPending ||
		isCreateWishlistItemPending

	const isInWishlist = wishlist
		.concat(archivedWishlist)
		.some((item) => item.product.id === product.id)

	const onAddWishlistItem = () => {
		createWishlistItem({ productId: product.id })
	}

	const increment = () => {
		if (product.count !== 0 || product.count > count) {
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
		<div className={clsx(styles.container, 'animate-opacity')}>
			{product.isArchived && (
				<div className={styles.overlay}>
					<h5 className={styles.overlayTitle}>Нет в наличии</h5>
				</div>
			)}
			<div className={styles.inner}>
				<div className={styles.cover}>
					{discountValue && Number(discountValue) < Number(price) && (
						<div className={styles.discount}>
							-{calcDiscountPercent(Number(price), Number(discountValue))}%
						</div>
					)}
					<Link
						className={styles.link}
						href={`${ROUTE.PRODUCT}/${product.slug}`}
					>
						<ProductImage
							src={imageSrc}
							isPlaceholder={
								!product.images.length && !!product.category.imageUrl
							}
							width={250}
							height={250}
							size='small'
							alt={product.name}
							priority
						/>
					</Link>
				</div>
				<div className={styles.information}>
					<Link
						className={styles.title}
						href={`${ROUTE.PRODUCT}/${product.slug}`}
					>
						{product.name}
					</Link>
					{!product.isArchived && (
						<React.Fragment>
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
									disabled={
										isLoading ||
										!!(
											(product.count !== null && product.count === 0) ||
											(typeof product.count === 'number' &&
												product.count <= count)
										)
									}
									onClick={increment}
								>
									<Plus size={18} />
								</button>
							</div>
							<div className={styles.details}>
								<Badge
									size='sm'
									color={
										product.count !== 0
											? 'green'
											: product.count === 0
												? 'red'
												: product.count &&
													  product.count > 0 &&
													  product.count < 5
													? 'orange'
													: 'grey'
									}
								>
									{product.count || product.count === 0
										? `На складе ${product.count} шт.`
										: 'Есть в наличии'}
								</Badge>
								<p className={styles.guarantee}>
									{product.guarantee
										? `Гарантия ${calcNounDeclension(product.guarantee, 'месяц', 'месяца', 'месяцев')}`
										: 'Без гарантии'}
								</p>
							</div>
						</React.Fragment>
					)}
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
				<PriceBadge
					size='small'
					price={price}
					discountPrice={discountValue}
				/>
			</div>
		</div>
	)
}

export { CartItemSkeleton } from './skeleton'
