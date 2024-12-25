'use client'

import React from 'react'

import {
	SearchBar,
	ProductCard,
	EmptyBlock,
	Pagination,
	ProductFilters,
	ProductSortBar
} from '@/components'

import { useWindowSize } from '@/hooks/useWindowSize'

import type { ProductsType } from '@/types/product.types'

import styles from './product-list.module.scss'
import { ListViewButton } from '../ui/ListViewButton'
import clsx from 'clsx'

export enum ListView {
	TILE = 'tile',
	SIMPLE = 'simple'
}

export const ProductList: React.FC<ProductsType> = ({ items, count }) => {
	const [view, setView] = React.useState<ListView>(ListView.SIMPLE)

	const { width } = useWindowSize()
	const isTablet = width && width <= 1024

	const onChangeView = (mode: ListView) => {
		setView(mode)
	}

	return (
		<div className={styles.container}>
			<aside className={styles.sidebar}>
				{!isTablet && <ProductFilters />}
			</aside>
			<div className={styles.inner}>
				<div className={styles.search}>
					<SearchBar variant='contained' />
				</div>
				<div className='gap-3.5 flex items-center'>
					<ProductSortBar className='flex-1' />
					<ListViewButton
						view={view}
						onChange={onChangeView}
					/>
				</div>
				{items.length > 0 && (
					<div
						className={clsx(styles.list, {
							[styles.vertical]: view === ListView.SIMPLE,
							[styles.horizontal]: view === ListView.TILE
						})}
					>
						{items.map((item) => (
							<ProductCard
								key={item.id}
								variant={view}
								{...item}
							/>
						))}
					</div>
				)}
				{!items ||
					(items.length === 0 && (
						<EmptyBlock title='К сожалению, товары не были найдены на нашем складе. Очень скоро мы это исправим!' />
					))}
				{items.length > 0 && <Pagination total={count} />}
			</div>
		</div>
	)
}
