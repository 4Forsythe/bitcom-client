import React from 'react'

import { ProductGroupItem, ProductGroupItemSkeleton } from './ProductGroupItem'

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
			<h1 className={styles.title}>{title}</h1>
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
