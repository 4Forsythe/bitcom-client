import React from 'react'
import Link from 'next/link'

import { ProductGroupItem, ProductGroupItemSkeleton } from './ProductGroupItem'

import { ROUTE } from '@/config/routes.config'

import type { ProductType } from '@/types/product.types'

import styles from './product-group.module.scss'

interface IProductGroupProps {
	title: string
	items: ProductType[]
	isLoading?: boolean
}

export const ProductGroup: React.FC<IProductGroupProps> = ({
	title,
	items,
	isLoading
}) => {
	return (
		<section className={styles.container}>
			<div className={styles.heading}>
				<h2 className={styles.title}>{title}</h2>
				{/* <Link
					href={ROUTE.CATALOG}
					className={styles.link}
				>
					Открыть больше
				</Link> */}
			</div>
			<div className={styles.inner}>
				{isLoading
					? [...new Array(4)].map((_, index) => (
							<ProductGroupItemSkeleton key={index} />
						))
					: items &&
						items.map((item) => (
							<ProductGroupItem
								key={item.id}
								{...item}
							/>
						))}
			</div>
		</section>
	)
}

export { ProductGroupItem, ProductGroupItemSkeleton } from './ProductGroupItem'
