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
import { getSearchParams } from '@/utils/get-search-params'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'

import type { ProductsType, ProductType } from '@/types/product.types'

import styles from './product-list.module.scss'
import { useProductListStore } from '@/store/product-list'

export enum ViewType {
	TILE = 'tile',
	SIMPLE = 'simple'
}

interface Props extends ProductsType {
	searchParams: ReturnType<typeof getSearchParams>
}

export const ProductList: React.FC<Props> = ({
	items,
	count,
	searchParams
}) => {
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

	const loadMoreProducts = () => {
		const page = Number(params.get('page')) || 1
		const qs = new URLSearchParams(params.toString())

		qs.set('page', String(page + 1))
		router.replace(`?${qs.toString()}`, { scroll: false })

		setIsShowingMore(true)
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
						<LoadMore onLoad={loadMoreProducts} />
						<Pagination total={count} />
					</>
				)}
			</div>

			<BackToTop />
		</div>
	)
}
