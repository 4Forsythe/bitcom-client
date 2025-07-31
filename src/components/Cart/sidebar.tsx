'use client'

import React from 'react'
import clsx from 'clsx'

import { Button } from '@/components/ui/Button'

import { useCartStore } from '@/store/cart'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

import styles from './cart.module.scss'
import { calcCartDiscounts } from '@/utils/calc-cart-discounts'

interface Props {
	isPending?: boolean
}

export const Sidebar: React.FC<Props> = ({ isPending }) => {
	const { items, total } = useCartStore()

	const { discountDifference, discountProducts } = calcCartDiscounts(items)

	return (
		<div className={styles.sidebar}>
			<div className={clsx(styles.block, 'animate-opacity')}>
				{discountDifference > 0 && (
					<div className={clsx(styles.summary, styles.discount)}>
						<span className={styles.total}>Скидки</span>
						<div className={styles.amount}>
							<span className={styles.text}>
								{discountProducts > 0
									? calcNounDeclension(
											discountProducts,
											'товар',
											'товара',
											'товаров'
										)
									: 'Нет товаров'}
							</span>
							<div className={styles.divider} />
							<span className={styles.text}>{`${discountDifference} ₽`}</span>
						</div>
					</div>
				)}
				<div className={styles.summary}>
					<span className={styles.total}>Итого</span>
					<div className={styles.amount}>
						<span className={styles.text}>
							{items?.length > 0
								? calcNounDeclension(items.length, 'товар', 'товара', 'товаров')
								: 'Нет товаров'}
						</span>
						<div className={styles.divider} />
						<span className={styles.text}>
							{items?.length > 0
								? +total > 0
									? `${total} ₽`
									: 'Цена на месте'
								: ''}
						</span>
					</div>
				</div>
				<Button
					className={styles.action}
					variant={items?.length === 0 ? 'outlined' : 'contained'}
					type='submit'
					isLoading={isPending}
					disabled={items?.length === 0 || isPending}
				>
					Оформить заказ
				</Button>
			</div>
		</div>
	)
}
