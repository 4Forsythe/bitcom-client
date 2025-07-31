import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { SERVER_BASE_URL } from '@/constants'
import { ROUTE } from '@/config/routes.config'
import { ProductImage } from '@/components/ProductImage'

import type { OrderItemType } from '@/types/order.types'

import styles from './order-product-card.module.scss'

export const OrderProductCard: React.FC<OrderItemType> = ({
	product,
	productId,
	count
}) => {
	const imageSrc =
		product.images.length > 0
			? `${SERVER_BASE_URL}/${product.images[0].url}`
			: product.category.imageUrl
				? `/static/${product.category.imageUrl}`
				: undefined

	return (
		<Link
			className={styles.container}
			href={`${ROUTE.PRODUCT}/${product.slug}`}
		>
			<div className={styles.cover}>
				<div className={styles.preview}>
					<ProductImage
						src={imageSrc}
						isPlaceholder={
							!product.images.length && !!product.category.imageUrl
						}
						width={250}
						height={250}
						size='small'
						alt={product.name}
					/>
					<span className={styles.count}>{count} шт</span>
				</div>
			</div>
			<h1 className={styles.title}>{product.name}</h1>
		</Link>
	)
}
