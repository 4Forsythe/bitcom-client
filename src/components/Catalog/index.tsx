'use server'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'

import { ROUTE } from '@/config/routes.config'

import type { ProductCategoriesType } from '@/types/product-category.types'

import styles from './catalog.module.scss'

export const Catalog: React.FC<ProductCategoriesType> = ({ items }) => {
	return (
		<div className={styles.container}>
			{items.map((category) => (
				<div
					className={clsx(styles.card, {
						[styles.hint]: category.children.length > 0
					})}
				>
					{category.children.length > 0 && (
						<div className={styles.categories}>
							<Link
								key={category.id}
								href={`${ROUTE.CATALOG}/${category.id}`}
								className={styles.categoriesTitle}
							>
								{category.name}
							</Link>
							{category.children.map((child) => (
								<Link
									key={child.id}
									href={`${ROUTE.CATALOG}/${child.id}`}
									className={styles.categoriesLink}
								>
									{child.name}
								</Link>
							))}
						</div>
					)}
					<Link
						key={category.id}
						href={`${ROUTE.CATALOG}/${category.id}`}
						className={styles.category}
					>
						<div className={styles.categoryCover}>
							<Image
								className={clsx(styles.image, {
									[styles.placeholder]: !category?.imageUrl
								})}
								width={170}
								height={120}
								src={
									category.imageUrl
										? `/static/${category.imageUrl}`
										: '/static/image-placeholder.png'
								}
								alt={category.name}
								priority
							/>
						</div>
						<span className={styles.categoryTitle}>{category.name}</span>
					</Link>
				</div>
			))}
		</div>
	)
}
