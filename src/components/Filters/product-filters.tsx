'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { FiltersGroup } from './FiltersGroup'
import { FiltersSearchBar } from './FiltersSearchBar'
import { FiltersSkeleton } from './skeleton'

import { ROUTE } from '@/config/routes.config'

import { useFiltersStore } from '@/store/filters'
import { useProductCategories } from '@/hooks/useProductCategories'

import styles from './filters.module.scss'

export const ProductFilters: React.FC = () => {
	const pathname = usePathname()

	const { isProductCategoriesLoading } = useProductCategories()
	const { productCategories } = useFiltersStore()

	if (isProductCategoriesLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.inner}>
					{[...new Array(1)].map((_, index) => (
						<FiltersSkeleton key={index} />
					))}
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				{productCategories && productCategories.items.length > 0 && (
					<>
						{pathname !== ROUTE.SEARCH && <FiltersSearchBar />}
						<FiltersGroup
							path={`${ROUTE.CATALOG}/`}
							title='Категории'
							items={productCategories.items}
						/>
					</>
				)}
			</div>
		</div>
	)
}
