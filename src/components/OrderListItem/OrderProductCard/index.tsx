import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { SERVER_BASE_URL } from '@/constants'
import { ROUTE } from '@/config/routes.config'

import type { OrderItemType } from '@/types/order.types'

import styles from './order-product-card.module.scss'

export const OrderProductCard: React.FC<OrderItemType> = ({
	product,
	productId,
	count
}) => {
	return (
		<Link
			className={styles.container}
			href={`${ROUTE.PRODUCT}/${productId}`}
		>
			<div className={styles.cover}>
				<div className={styles.preview}>
					<Image
						className={clsx(styles.image, {
							[styles.placeholder]: !product.imageUrl
						})}
						width={100}
						height={100}
						src={
							product.imageUrl
								? `${SERVER_BASE_URL}/${product.imageUrl}`
								: product.category?.imageUrl
									? `/static/${product.category.imageUrl}`
									: '/static/image-placeholder.png'
						}
						blurDataURL='/static/image-placeholder.png'
						placeholder='blur'
						alt={product.name}
						priority
					/>
					<span className={styles.count}>{count} шт</span>
				</div>
			</div>
			<h1 className={styles.title}>{product.name}</h1>
		</Link>
	)
}
