'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

import { AddWishlistButton, Badge, Button } from '@/components'

import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { useProfile } from '@/hooks/useProfile'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useCreateCartItem } from '@/hooks/useCreateCartItem'
import { useCreateWishlistItem } from '@/hooks/useCreateWishlistItem'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'

import type { ProductType } from '@/types/product.types'

import styles from './product.module.scss'

type IProduct = ProductType & {
	imagePlaceholder?: string
}

export const Product: React.FC<IProduct> = ({
	id,
	name,
	description,
	imageUrl,
	imagePlaceholder,
	barcode,
	category,
	device,
	brand,
	model,
	count,
	price
}) => {
	const router = useRouter()
	const pathname = usePathname()

	const [imagePath, setImagePath] = React.useState<string | undefined>()
	const [imageSrc, setImageSrc] = React.useState<string>(
		`${SERVER_BASE_URL}/${imageUrl}`
	)

	const { isCartLoading } = useCart()
	const { isWishlistLoading } = useWishlist()
	const { isProfileLoading } = useProfile()

	const { createCartItem, isCreateCartItemPending } = useCreateCartItem()

	const { items: cart } = useCartStore()
	const { items: wishlist } = useWishlistStore()

	const isLoading = isCartLoading || isWishlistLoading || isProfileLoading

	const isInCart = Boolean(cart.find((item) => item.product.id === id))
	const isInWishlist = Boolean(wishlist.find((item) => item.product.id === id))

	const { createWishlistItem, isCreateWishlistItemPending } =
		useCreateWishlistItem()

	const onAddCartItem = () => {
		isInCart ? router.push(ROUTE.CART) : createCartItem({ productId: id })
	}

	const onAddWishlistItem = () => {
		createWishlistItem({ productId: id })
	}

	const handleImageUrl = (event: React.SyntheticEvent<HTMLImageElement>) => {
		setImagePath(event.currentTarget.src)
	}

	const handleImageError = () => {
		setImageSrc('/static/image-placeholder.png')
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.cover}>
					<Link
						href={imageUrl ?? imagePath ?? pathname}
						target='_blank'
					>
						<Image
							className={styles.image}
							width={750}
							height={750}
							src={
								imageUrl
									? imageSrc
									: category?.imageUrl
										? `/static/${category.imageUrl}`
										: '/static/image-placeholder.png'
							}
							blurDataURL={
								imageUrl ? imagePlaceholder : '/static/image-placeholder.png'
							}
							placeholder='blur'
							alt={name}
							priority
							onLoad={handleImageUrl}
							onError={handleImageError}
						/>
					</Link>
				</div>
				<div className={styles.information}>
					<div className={styles.overview}>
						<div className={styles.head}>
							<h1 className={styles.title}>{name}</h1>
							<p className={styles.article}>{barcode[0]}</p>
						</div>
					</div>
					<div className={styles.options}>
						<div className={styles.availables}>
							{category && (
								<Link href={`${ROUTE.CATALOG}/${category.id}`}>
									<Badge
										className={styles.category}
										variant='contained'
									>
										{category?.name}
									</Badge>
								</Link>
							)}
							<span className={styles.breadcrumb}>В наличии {count} шт.</span>
						</div>
						<p className={styles.description}>
							{description || (
								<span className={styles.text}>Описание отсутствует</span>
							)}
						</p>
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
										onClick={onAddCartItem}
									>
										{isInCart ? 'В корзине' : 'В корзину'}
									</Button>
									<AddWishlistButton
										variant={isInWishlist ? 'contained' : 'outlined'}
										isLoading={isWishlistLoading || isCreateWishlistItemPending}
										onClick={onAddWishlistItem}
									/>
								</div>
							)}
							<span className={styles.price}>
								{+price > 0 ? `${price} ₽` : 'Цена по запросу'}
							</span>
						</div>
					</div>
					<div className={styles.details}>
						<p className={styles.title}>Характеристики товара</p>
						<ul className={styles.characteristics}>
							<li className={styles.characteristic}>
								Тип устройства
								<span>{device?.name || '—'}</span>
							</li>
							<li className={styles.characteristic}>
								Бренд
								<span>{brand?.name || '—'}</span>
							</li>
							<li className={styles.characteristic}>
								Модель
								<span>{model || '—'}</span>
							</li>
							<li className={styles.characteristic}>
								Гарантия
								<span>3 месяца</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
