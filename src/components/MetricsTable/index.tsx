import React from 'react'
import Image from 'next/image'

import clsx from 'clsx'

import { metricsService } from '@/services/metrics.service'

import styles from './metrics-table.module.scss'
import { orderService } from '@/services/order.service'
import { productService } from '@/services/product.service'

export const MetricsTable: React.FC = async () => {
	const { viewers, views } = await metricsService.getAll()

	const ordersTotal = await orderService.getTotal()
	const productsTotal = await productService.getTotal()

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<div className={styles.head}>
					<span className={styles.title}>Постоянных посетителей</span>

					<span className={clsx(styles.counter, 'animate-bounce')}>
						{viewers}
					</span>
				</div>
				<ul className={styles.list}>
					<li className={clsx(styles.item, 'animate-bounce')}>
						<span className={styles.title}>Открыто страниц</span>
						<span className={clsx(styles.counter, 'animate-opacity')}>
							{views}
						</span>
					</li>
					<li className={clsx(styles.item, 'animate-bounce')}>
						<span className={styles.title}>Товаров на складе</span>
						<span className={clsx(styles.counter, 'animate-opacity')}>
							{productsTotal}
						</span>
					</li>
					<li className={clsx(styles.item, 'animate-bounce')}>
						<span className={styles.title}>Создано заказов</span>
						<span className={clsx(styles.counter, 'animate-opacity')}>
							{ordersTotal}
						</span>
					</li>
				</ul>
			</div>
			<div className={styles.logotype}>
				<Image
					className={styles.image}
					width={230}
					height={230}
					src='/static/LOGO.png'
					alt='Logo'
					priority
				/>
			</div>
		</div>
	)
}
