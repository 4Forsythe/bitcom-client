'use client'

import React from 'react'

import clsx from 'clsx'
import {
	SearchBar,
	ProductCard,
	EmptyBlock,
	Pagination,
	ProductFilters,
	ProductSortBar,
	ListViewButton,
	ListRenderButton
} from '@/components'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import { getSearchParams } from '@/utils/get-search-params'

import type { ProductsType, ProductType } from '@/types/product.types'

import styles from './product-list.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'

export enum ViewType {
	TILE = 'tile',
	SIMPLE = 'simple'
}

export enum RenderType {
	SMALL = 10,
	MEDIUM = 20,
	LARGE = 30,
	INFINITE = 'infinite'
}

interface Props extends ProductsType {
	searchParams: ReturnType<typeof getSearchParams>
}

export const ProductList: React.FC<Props> = ({
	items,
	count,
	searchParams
}) => {
	const [data, setData] = React.useState<ProductType[]>(items)

	const [viewType, setViewType] = React.useState<ViewType>(ViewType.SIMPLE)
	const [renderType, setRenderType] = React.useState<RenderType>(
		RenderType.SMALL
	)

	const router = useRouter()
	const params = useSearchParams()

	const { width } = useWindowSize()
	const isTablet = width && width <= 1024

	const { products, intersectionRef } = useInfiniteProducts({
		params: searchParams,
		enabled: renderType === RenderType.INFINITE
	})

	React.useEffect(() => {
		if (renderType === RenderType.INFINITE && products) {
			const iteration = products.pages.flatMap((page) => page.items)
			const allItems = [...items, ...iteration]

			setData(allItems)
		}

		if (renderType !== RenderType.INFINITE) {
			setData(items)
		}
	}, [renderType, products, searchParams])

	const onChangeViewType = (type: ViewType) => {
		setViewType(type)
	}

	const onChangeRenderType = (type: RenderType) => {
		setRenderType(type)

		const qs = new URLSearchParams(params.toString())
		qs.set('limit', String(type))
		qs.delete('page')

		router.push(`?${qs.toString()}`)
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
				<ListRenderButton
					mode={renderType}
					onChange={onChangeRenderType}
				/>
				<div className='gap-3.5 flex items-center'>
					<ProductSortBar className='flex-1' />
					<ListViewButton
						mode={viewType}
						onChange={onChangeViewType}
					/>
				</div>
				{items.length > 0 && (
					<div
						className={clsx(styles.list, {
							[styles.vertical]: viewType === ViewType.SIMPLE,
							[styles.horizontal]: viewType === ViewType.TILE
						})}
					>
						{data.map((item) => (
							<ProductCard
								key={item.id}
								variant={viewType}
								{...item}
							/>
						))}
					</div>
				)}

				{renderType === RenderType.INFINITE && <div ref={intersectionRef} />}

				{!items ||
					(items.length === 0 && (
						<EmptyBlock title='К сожалению, товары не были найдены на нашем складе. Очень скоро мы это исправим!' />
					))}

				{renderType !== RenderType.INFINITE && items.length > 0 && (
					<Pagination total={count} />
				)}
			</div>
		</div>
	)
}
