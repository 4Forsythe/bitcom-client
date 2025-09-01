'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import {
	BackToTop,
	SearchBar,
	EmptyBlock,
	Pagination,
	ProductFilters,
	ProductSortBar,
	LoadMore,
	ProductCardSkeleton,
	DiscountCard
} from '@/components'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useDiscountListStore } from '@/store/discount-list'

import type { DiscountsType } from '@/types/discount.types'

import styles from './discount-list.module.scss'
import { DiscountSortBar } from './discount-sort-bar'

export const DiscountList: React.FC<DiscountsType> = ({ items, count }) => {
	const [isShowingMore, setIsShowingMore] = React.useState(false)

	const router = useRouter()
	const params = useSearchParams()
	const { width } = useWindowSize()
	const { discounts, isLoading, setDiscounts, combineDiscounts, setIsLoading } =
		useDiscountListStore()

	const isTablet = width && width <= 1024

	const page = Number(params.get('page')) || 1
	const limit = Number(params.get('limit')) || 15
	const pages = Math.ceil(count / limit)

	const loadMoreDiscounts = () => {
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
			combineDiscounts(items, count)
			setIsShowingMore(false)
		} else {
			setDiscounts(items, count)
		}

		setIsLoading(false)
	}, [items, params])

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				{isLoading ? (
					<div className='w-full h-[40px] bg-gray-200 rounded-lg animate-pulse'></div>
				) : (
					items.length > 0 && (
						<div className='gap-3.5 flex items-center animate-opacity'>
							<DiscountSortBar className='flex-1' />
						</div>
					)
				)}
				{isLoading &&
					[...new Array(3)].map((_, index) => (
						<ProductCardSkeleton key={index} />
					))}

				{items.length > 0 && (
					<div className={styles.list}>
						{discounts.map((item) => (
							<DiscountCard
								key={item.id}
								discount={item}
							/>
						))}
					</div>
				)}

				{!items ||
					(items.length === 0 && (
						<EmptyBlock title='К сожалению, сейчас у нас нет действующих акций. Очень скоро мы это исправим!' />
					))}

				{items.length > 0 && items.length < count && (
					<>
						{pages - page >= 1 && <LoadMore onLoad={loadMoreDiscounts} />}
						<Pagination total={count} />
					</>
				)}
			</div>

			<BackToTop />
		</div>
	)
}
