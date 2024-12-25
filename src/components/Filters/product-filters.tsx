'use client'

import React from 'react'

import { FiltersGroup } from './FiltersGroup'
import { FiltersSkeleton } from './skeleton'

import { ROUTE } from '@/config/routes.config'

import { useFiltersStore } from '@/store/filters'
import { useProductCategories } from '@/hooks/useProductCategories'
import { useDevices } from '@/hooks/useDevices'

import styles from './filters.module.scss'

export const ProductFilters: React.FC = () => {
	const { isProductCategoriesLoading } = useProductCategories()
	const { isDevicesLoading } = useDevices()

	const isLoading = isProductCategoriesLoading || isDevicesLoading

	const { productCategories, devices } = useFiltersStore()

	if (isLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.inner}>
					{[...new Array(2)].map((_, index) => (
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
					<FiltersGroup
						path={`${ROUTE.CATALOG}/`}
						title='Категории'
						items={productCategories.items}
						showmoreHref={ROUTE.CATALOG}
					/>
				)}
				{devices && (
					<FiltersGroup
						path={`${ROUTE.SEARCH}?device=`}
						title='Устройства'
						items={devices.items}
						showmoreHref={ROUTE.DEVICES}
					/>
				)}
			</div>
		</div>
	)
}
