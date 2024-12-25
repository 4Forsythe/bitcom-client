'use client'

import React from 'react'

import { OrderListItem, Pagination, EmptyBlock } from '@/components'

import { useOrders } from '@/hooks/useOrders'

import { OrderListItemSkeleton } from '../OrderListItem'
import { useOrdersStore } from '@/store/orders'

import styles from './order-list.module.scss'

export const OrderList: React.FC = () => {
	const { isOrdersLoading } = useOrders()
	const { items, count } = useOrdersStore()

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{isOrdersLoading
					? [...new Array(3)].map((_, index) => (
							<OrderListItemSkeleton key={index} />
						))
					: items.map((item) => (
							<OrderListItem
								key={item.id}
								{...item}
							/>
						))}
			</div>

			{!isOrdersLoading && !(items.length > 0) && (
				<EmptyBlock
					title='У вас пока нет ни одного заказа'
					description='Оформляйте заказы и покупки через сайт, чтобы их можно было отслеживать в этом разделе!'
				/>
			)}

			{items.length > 0 && <Pagination total={count} />}
		</div>
	)
}
