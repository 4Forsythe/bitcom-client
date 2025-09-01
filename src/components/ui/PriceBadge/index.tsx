import React from 'react'
import clsx from 'clsx'
import { calcDiscountPercent } from '@/utils/calc-discount-percent'

import styles from './price-badge.module.scss'

export interface IPriceBadgeProps {
	size?: 'default' | 'small'
	price: string | number
	discountPrice?: string | number
	className?: string
}

export const PriceBadge: React.FC<IPriceBadgeProps> = ({
	size = 'default',
	price,
	discountPrice,
	className
}) => {
	const hasDiscount =
		Number(discountPrice) > 0 &&
		Number(price) > 0 &&
		Number(discountPrice) < Number(price)

	return (
		<div
			className={clsx(styles.container, className, {
				[styles.small]: size === 'small'
			})}
		>
			<div className={styles.price}>
				<span
					className={clsx(styles.text, {
						[styles.discounted]: hasDiscount,
						[styles.nullable]: !Number(price) || Number(price) === 0
					})}
				>
					{+price > 0
						? `${new Intl.NumberFormat('ru-RU').format(Number(price))} ₽`
						: 'Цена по запросу'}
				</span>
				{hasDiscount && (
					<div className={styles.percent}>
						-{calcDiscountPercent(Number(price), Number(discountPrice))}%
					</div>
				)}
			</div>
			{hasDiscount && (
				<div className={styles.discount}>
					{new Intl.NumberFormat('ru-RU').format(Number(discountPrice))} ₽
				</div>
			)}
		</div>
	)
}
