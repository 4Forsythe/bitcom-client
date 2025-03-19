'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

import clsx from 'clsx'
import { Loader2 } from 'lucide-react'
import { AddWishlistButton, Badge, Button } from '@/components'

import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { useModal } from '@/hooks/useModal'
import { useProfile } from '@/hooks/useProfile'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useCreateCartItem } from '@/hooks/useCreateCartItem'
import { useCreateWishlistItem } from '@/hooks/useCreateWishlistItem'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'

import type { ProductType } from '@/types/product.types'

import styles from './product.module.scss'
import { ProductPreviewModal } from './ProductPreviewModal'

type IProduct = ProductType & {
	imagePlaceholder: string
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
	const [hasImageError, setHasImageError] = React.useState(false)
	const [isImageLoading, setIsImageLoading] = React.useState(true)

	const [imageSrc, setImageSrc] = React.useState<string>(
		imageUrl
			? `${SERVER_BASE_URL}/${imageUrl}`
			: '/static/image-placeholder.png'
	)
	const [imagePath, setImagePath] = React.useState<string | undefined>()

	const { onOpen } = useModal()
	const { isCartLoading } = useCart()
	const { isWishlistLoading } = useWishlist()
	const { isProfileLoading } = useProfile()

	const { createCartItem, isCreateCartItemPending } = useCreateCartItem()

	const { items: cart } = useCartStore()
	const { items: wishlist } = useWishlistStore()

	const isLoading =
		isCartLoading || isWishlistLoading || isProfileLoading || isImageLoading

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

	const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
		setIsImageLoading(false)
		setImagePath(event.currentTarget.src)
	}

	const handleImageError = () => {
		setHasImageError(true)
		setImageSrc(
			category?.imageUrl
				? `/static/${category.imageUrl}`
				: '/static/image-placeholder.png'
		)
	}

	const onShowPreview = () => {
		if (imageUrl && !hasImageError) {
			onOpen(
				<ProductPreviewModal
					imageUrl={`${SERVER_BASE_URL}/${imageUrl}`}
					alt={name}
				/>
			)
		}
	}

	return (
		<>
			<div className={styles.container}>
				<div
					className={clsx(styles.cover, { [styles.loaded]: isImageLoading })}
					style={{ cursor: imageUrl && !hasImageError ? 'pointer' : 'default' }}
				>
					{isImageLoading && (
						<div className={styles.loader}>
							<Loader2 className={styles.icon} />
						</div>
					)}
					<div onClick={onShowPreview}>
						<Image
							className={clsx(styles.image, {
								[styles.placeholder]: isLoading || hasImageError || !imageUrl
							})}
							width={400}
							height={250}
							src={
								imageUrl
									? imageSrc
									: category?.imageUrl
										? `/static/${category.imageUrl}`
										: '/static/image-placeholder.png'
							}
							placeholder='blur'
							blurDataURL={imagePlaceholder}
							alt={name}
							priority
							onLoad={handleImageLoad}
							onError={handleImageError}
						/>
					</div>
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
