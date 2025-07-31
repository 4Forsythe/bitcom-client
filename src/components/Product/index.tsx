'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import clsx from 'clsx'
import { Archive, Eye, EyeOff, PencilLine } from 'lucide-react'
import { ProductImageGallery } from './ProductImageGallery'
import {
	AddWishlistButton,
	Badge,
	Button,
	PriceBadge,
	ProductManagerControls
} from '@/components'

import { useUserStore } from '@/store/user'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { useProfile } from '@/hooks/useProfile'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useCreateCartItem } from '@/hooks/useCreateCartItem'
import { useCreateWishlistItem } from '@/hooks/useCreateWishlistItem'

import { ROUTE } from '@/config/routes.config'

import type { ProductType } from '@/types/product.types'

import styles from './product.module.scss'

export const Product: React.FC<ProductType> = ({
	id,
	slug,
	name,
	description,
	images,
	price,
	discountPrice,
	count,
	sku,
	isArchived,
	isPublished,
	category
}) => {
	const router = useRouter()
	const [hasDescriptionHidden, setHasDescriptionHidden] = React.useState(false)
	const [isDescriptionExpanded, setIsDescriptionExpanded] =
		React.useState(false)

	const { isCartLoading } = useCart()
	const { isWishlistLoading } = useWishlist()
	const { isProfileLoading } = useProfile()

	const { createCartItem, isCreateCartItemPending } = useCreateCartItem()

	const { user } = useUserStore()
	const { items: cart, archived: archivedCart } = useCartStore()
	const { items: wishlist, archived: archivedWishlist } = useWishlistStore()

	const isLoading = isCartLoading || isWishlistLoading || isProfileLoading

	const isInCart = Boolean(
		cart.concat(archivedCart).find((item) => item.product.id === id)
	)
	const isInWishlist = Boolean(
		wishlist.concat(archivedWishlist).find((item) => item.product.id === id)
	)

	const descriptionRef = React.useRef<HTMLParagraphElement>(null)
	const descriptionHtml = description
		? description.replace(/\\n/g, '<br />').replace(/\n/g, '<br />')
		: 'Описание отсуствует'

	const { createWishlistItem, isCreateWishlistItemPending } =
		useCreateWishlistItem()

	const onAddCartItem = () => {
		isInCart ? router.push(ROUTE.CART) : createCartItem({ productId: id })
	}

	const onAddWishlistItem = () => {
		createWishlistItem({ productId: id })
	}

	const onToggleDescriptionExpander = () => {
		setIsDescriptionExpanded((prev) => {
			if (prev && descriptionRef.current) {
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}
			return !prev
		})
	}

	React.useEffect(() => {
		if (descriptionRef.current) {
			const element = descriptionRef.current
			const lineHeight = parseFloat(getComputedStyle(element).lineHeight)
			const maxLines = 8
			const maxHeight = lineHeight * maxLines

			setHasDescriptionHidden(element.scrollHeight > maxHeight)
		}
	}, [descriptionHtml])

	return (
		<>
			<div className={styles.container}>
				<div className={styles.gallery}>
					<ProductImageGallery
						images={images}
						category={category}
						alt={name}
					/>
					{isArchived && (
						<div className={styles.overlay}>
							<h5 className={styles.overlayTitle}>Нет в наличии</h5>
						</div>
					)}
				</div>
				<div className={styles.information}>
					<div className={styles.overview}>
						<div className={styles.head}>
							<h1 className={styles.title}>
								{isPublished ? name : `${name} (черновик)`}
							</h1>
						</div>
					</div>
					<div className={styles.options}>
						<div className={styles.availables}>
							{category && (
								<Link href={`${ROUTE.CATALOG}/${category.id}`}>
									<Badge
										className={styles.category}
										variant='outlined'
									>
										{category?.name}
									</Badge>
								</Link>
							)}
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
						{user?.role && (
							<ProductManagerControls
								productId={id}
								isPublished={isPublished}
								isArchived={isArchived}
								refreshPage
							/>
						)}
						<div className={styles.description}>
							<p
								ref={descriptionRef}
								className={clsx(styles.descriptionText, {
									[styles.expanded]: isDescriptionExpanded
								})}
								dangerouslySetInnerHTML={{
									__html: descriptionHtml
								}}
							/>
							{hasDescriptionHidden && (
								<button
									className={clsx(styles.descriptionExpand, 'animate-opacity')}
									onClick={onToggleDescriptionExpander}
								>
									{hasDescriptionHidden && !isDescriptionExpanded
										? 'Подробнее'
										: 'Скрыть'}
								</button>
							)}
						</div>
						<div className={styles.features}>
							{isLoading ? (
								<div className={styles.controls}>
									<div className='w-[130px] h-[50px] bg-gray-300 rounded-md animate-pulse' />
									<div className='w-[50px] h-[50px] bg-gray-300 rounded-md animate-pulse' />
								</div>
							) : (
								<div className={styles.controls}>
									<Button
										variant={isInCart ? 'outlined' : 'contained'}
										isLoading={isCartLoading || isCreateCartItemPending}
										disabled={!isPublished}
										onClick={onAddCartItem}
									>
										{isInCart ? 'В корзине' : 'В корзину'}
									</Button>
									<AddWishlistButton
										variant={isInWishlist ? 'contained' : 'outlined'}
										isLoading={isWishlistLoading || isCreateWishlistItemPending}
										disabled={!isPublished}
										onClick={onAddWishlistItem}
									/>
								</div>
							)}
							<PriceBadge
								price={price}
								discountPrice={discountPrice}
							/>
						</div>
					</div>
					<div className={styles.details}>
						<p className={styles.title}>Характеристики товара</p>
						<ul className={styles.characteristics}>
							<li className={styles.characteristic}>
								<div className={styles.characteristicType}>
									<span>Категория</span>
								</div>
								<span>{category.name || 'не указана'}</span>
							</li>
							<li className={styles.characteristic}>
								<div className={styles.characteristicType}>
									<span>Гарантия продавца</span>
								</div>
								<span>3 мес.</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
