'use client'

import React from 'react'
import Link from 'next/link'

import { TelegramBanner } from '../TelegramBanner'
import { useProductCategories } from '@/hooks/useProductCategories'

import styles from './product-categories.module.scss'
import { ROUTE } from '@/config/routes.config'
import { ProductCategoriesSkeleton } from './skeleton'

export const ProductCategories: React.FC = () => {
	const { productCategories, isProductCategoriesLoading } =
		useProductCategories()

	return (
		<div className={styles.container}>
			{isProductCategoriesLoading ? (
				<ProductCategoriesSkeleton />
			) : (
				productCategories &&
				productCategories.items.length > 0 && (
					<ul className={styles.list}>
						{productCategories.items.map((item) => (
							<li
								key={item.id}
								className={styles.item}
							>
								<Link href={`${ROUTE.CATALOG}/${item.id}`}>{item.name}</Link>
							</li>
						))}
					</ul>
				)
			)}
			<TelegramBanner />
		</div>
	)
}
