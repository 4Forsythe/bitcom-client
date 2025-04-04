'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import clsx from 'clsx'
import {
	BackToTop,
	SearchBar,
	ProductCard,
	EmptyBlock,
	Pagination,
	ProductFilters,
	ProductSortBar,
	ListViewButton,
	LoadMore,
	ProductCardSkeleton
} from '@/components'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useProductListStore } from '@/store/product-list'

import type { ProductsType } from '@/types/product.types'

import styles from './product-list.module.scss'

export enum ViewType {
	TILE = 'tile',
	SIMPLE = 'simple'
}

export const ProductList: React.FC<ProductsType> = ({ items, count }) => {
	const [viewType, setViewType] = React.useState<ViewType>(ViewType.SIMPLE)
	const [isShowingMore, setIsShowingMore] = React.useState(false)

	const router = useRouter()
	const params = useSearchParams()
	const { width } = useWindowSize()
	const { products, isLoading, setProducts, combineProducts, setIsLoading } =
		useProductListStore()

	const isTablet = width && width <= 1024

	const onChangeViewType = (type: ViewType) => {
		setViewType(type)
	}

	const page = Number(params.get('page')) || 1
	const limit = Number(params.get('limit')) || 15
	const pages = Math.ceil(count / limit)

	const loadMoreProducts = () => {
		if (pages - page >= 1) {
			const page = Number(params.get('page')) || 1
			const qs = new URLSearchParams(params.toString())

			qs.set('page', String(page + 1))
			router.replace(`?${qs.toString()}`, { scroll: false })

			setIsShowingMore(true)
		}
	}

	React.useEffect(() => {
		if (isShowingMore) {
			combineProducts(items, count)
			setIsShowingMore(false)
		} else {
			setProducts(items, count)
		}

		setIsLoading(false)
	}, [items, params])

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
						mode={viewType}
						onChange={onChangeViewType}
					/>
				</div>
				{isLoading &&
					[...new Array(3)].map((_, index) => (
						<ProductCardSkeleton key={index} />
					))}

				{items.length > 0 && (
					<div
						className={clsx(styles.list, {
							[styles.vertical]: viewType === ViewType.SIMPLE,
							[styles.horizontal]: viewType === ViewType.TILE
						})}
					>
						{products.map((item) => (
							<ProductCard
								key={item.id}
								variant={viewType}
								{...item}
							/>
						))}
					</div>
				)}

				{!items ||
					(items.length === 0 && (
						<EmptyBlock title='К сожалению, товары не были найдены на нашем складе. Очень скоро мы это исправим!' />
					))}

				{items.length > 0 && items.length < count && (
					<>
						{pages - page >= 1 && <LoadMore onLoad={loadMoreProducts} />}
						<Pagination total={count} />
					</>
				)}
			</div>

			<BackToTop />
		</div>
	)
}
