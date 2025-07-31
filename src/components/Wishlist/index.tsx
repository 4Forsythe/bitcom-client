'use client'

import React from 'react'

import {
	WishlistItem,
	WishlistItemSkeleton,
	EmptyBlock,
	InfoBlock
} from '@/components'

import { calcDaysDifference } from '@/utils/calc-days-difference'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

import { useWishlist } from '@/hooks/useWishlist'
import { useUserStore } from '@/store/user'
import { useWishlistStore } from '@/store/wishlist'

import styles from './wishlist.module.scss'

export const Wishlist: React.FC = () => {
	const { user } = useUserStore()
	const { items, archived, createdAt } = useWishlistStore()
	const { isWishlistLoading } = useWishlist()

	return (
		<div className={styles.container}>
			{createdAt && items.length > 0 && !user && (
				<div className={styles.heading}>
					<InfoBlock>
						{`Обратите внимание! Ваш список желаемого будет очищен через ${calcNounDeclension(calcDaysDifference(createdAt, 14), 'день', 'дня', 'дней')}. Войдите в систему, чтобы снять ограничения.`}
					</InfoBlock>
				</div>
			)}

			{!isWishlistLoading && !(items.length > 0) && (
				<EmptyBlock
					title='Похоже, ваш список желаемого пуст'
					description='Добавляйте сюда понравившиеся товары, а мы сделаем все возможное, чтобы вы смогли их потом найти!'
				/>
			)}

			{isWishlistLoading ? (
				<div className={styles.list}>
					{[...new Array(4)].map((_, index) => (
						<WishlistItemSkeleton key={index} />
					))}
				</div>
			) : (
				items.length > 0 && (
					<div className={styles.list}>
						{items.map((item) => (
							<WishlistItem
								key={item.id}
								{...item}
							/>
						))}
					</div>
				)
			)}

			{!isWishlistLoading && archived?.length > 0 && (
				<div className={styles.list}>
					<h5 className={styles.listTitle}>В архиве</h5>
					{archived.map((item) => (
						<WishlistItem
							key={item.id}
							{...item}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export { WishlistItem, WishlistItemSkeleton } from './WishlistItem'
