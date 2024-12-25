'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { CircleUser, Heart, Search, ShoppingCart } from 'lucide-react'

import { AuthForm } from '@/components'
import { Skeleton } from '@/components/ui/MenuButton/Skeleton'
import { MenuButton, type MenuButtonProps } from '@/components/ui/MenuButton'

import { useModal } from '@/hooks/useModal'
import { useProfile } from '@/hooks/useProfile'
import { useCartStore } from '@/store/cart'
import { ROUTE } from '@/config/routes.config'

import { useWishlistStore } from '@/store/wishlist'
import { useUserStore } from '@/store/user'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'

import styles from './header-menu.module.scss'

export const HeaderMenu: React.FC = () => {
	const router = useRouter()
	const { onOpen } = useModal()

	const { isProfileLoading } = useProfile()
	const { isCartLoading } = useCart()
	const { isWishlistLoading } = useWishlist()

	const isLoading = isProfileLoading || isCartLoading || isWishlistLoading

	const { user } = useUserStore()
	const { items: cart } = useCartStore()
	const { items: wishlist } = useWishlistStore()

	const onAuthClick = () => {
		!user ? onOpen(<AuthForm />) : router.push(ROUTE.PROFILE)
	}

	const list: MenuButtonProps[] = [
		{
			title: 'Корзина',
			icon: ShoppingCart,
			badge: String(cart.length),
			onClick: () => router.push(ROUTE.CART)
		},
		{
			title: 'Желаемое',
			icon: Heart,
			badge: String(wishlist.length),
			onClick: () => router.push(ROUTE.WISHLIST)
		},
		{
			title: user ? 'Кабинет' : 'Войти',
			icon: CircleUser,
			onClick: () => onAuthClick()
		}
	]

	return (
		<div className={styles.container}>
			{isLoading ? (
				<React.Fragment>
					{[...new Array(3)].map((_, index) => (
						<Skeleton key={index} />
					))}
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className={styles.search}>
						<MenuButton
							title='Поиск'
							icon={Search}
							onClick={() => router.push(ROUTE.SEARCH)}
						/>
					</div>
					{list.map((item, index) => (
						<MenuButton
							key={index}
							{...item}
						/>
					))}
				</React.Fragment>
			)}
		</div>
	)
}
