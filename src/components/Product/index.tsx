'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import clsx from 'clsx'
import { ProductImageGallery } from './ProductImageGallery'
import {
	AddWishlistButton,
	Badge,
	Button,
	DiscountBadge,
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
import { calcNounDeclension } from '@/utils/calc-noun-declension'
import { calcProductPriceValue } from '@/utils/calc-product-price-value'

import type { ProductType } from '@/types/product.types'

import styles from './product.module.scss'

export const Product: React.FC<ProductType> = (props) => {
	const router = useRouter()
	const [hasDescriptionHidden, setHasDescriptionHidden] = React.useState(false)
	const [isDescriptionExpanded, setIsDescriptionExpanded] =
		React.useState(false)

	const {
		id,
		name,
		description,
		images,
		price,
		discountPrice,
		discount,
		count,
		guarantee,
		isArchived,
		isPublished,
		category
	} = props

	const { isCartLoading } = useCart()
	const { isWishlistLoading } = useWishlist()
	const { isProfileLoading } = useProfile()

	const { createCartItem, isCreateCartItemPending } = useCreateCartItem()

	const { user } = useUserStore()
	const { items: cart, archived: archivedCart } = useCartStore()
	const { items: wishlist, archived: archivedWishlist } = useWishlistStore()

	const isLoading = isCartLoading || isWishlistLoading || isProfileLoading

	const discountValue = calcProductPriceValue(price, discountPrice)

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
							{!isArchived && discount && (
								<DiscountBadge
									discountId={discount.id}
									iconUrl='/icons/Fire.gif'
									expiredAt={discount.expiresAt}
								/>
							)}
							{!isArchived && (
								<Badge
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
						{user?.role && (
							<ProductManagerControls
								refreshPage
								product={props}
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
										? 'Раскрыть описание'
										: 'Свернуть описание'}
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
								discountPrice={discountValue}
							/>
						</div>
					</div>
					<div className={styles.details}>
						<p className={styles.guarantee}>
							{guarantee
								? `На данный товар действует гарантия — ${calcNounDeclension(guarantee, 'месяц', 'месяца', 'месяцев')}`
								: 'На данный товар НЕ действует гарантия'}
						</p>
						{/* <p className={styles.title}>Характеристики товара</p>
						<ul className={styles.characteristics}>
							<li className={styles.characteristic}>
								<div className={styles.characteristicType}>
									<span>Категория</span>
								</div>
								<span>{category.name || 'не указана'}</span>
							</li>
						</ul> */}
					</div>
				</div>
			</div>
		</>
	)
}
