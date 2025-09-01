'use client'

import React from 'react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { Loader2, OctagonAlert } from 'lucide-react'
import { List, AutoSizer, ListRowRenderer } from 'react-virtualized'

import { Badge, Button } from '../ui'
import { SmallSearchBar } from '../SmallSearchBar'
import { ProductSelectItem } from './ProductSelectItem'
import { FlatCategoryFilter } from '../FlatCategoryFilter'

import { useDebounce } from '@/hooks/useDebounce'
import { productService } from '@/services/product.service'

import type { ProductsType, ProductType } from '@/types/product.types'

import styles from './product-select.module.scss'

type TabVariantType = 'all' | 'selected'

type TabType = {
	name: string
	variant: TabVariantType
}

const TABS: TabType[] = [
	{ name: 'Все', variant: 'all' },
	{ name: 'Только выбранные', variant: 'selected' }
]

interface Props {
	items: ProductsType[]
	selectedItems: string[]
	isLoading?: boolean
	isFetching?: boolean
	error?: string
	className?: string
	onSelect: (item: ProductType) => void
	onFetch: ({
		query,
		categoryId
	}: {
		query?: string
		categoryId?: string
	}) => void
	onReset: () => void
}

export const ProductSelect = React.forwardRef<HTMLDivElement, Props>(
	(
		{
			items,
			selectedItems,
			isLoading,
			isFetching,
			error,
			className,
			onSelect,
			onFetch,
			onReset
		},
		ref
	) => {
		const { watch } = useFormContext()
		const [tab, setTab] = React.useState<TabVariantType>('all')
		const [filterCategory, setFilterCategory] = React.useState<string | null>(
			null
		)

		const discountPercent: number = watch('amount')
		const flatItems = items.flatMap((item) => item.items)

		const { query } = useDebounce({
			value: String(discountPercent),
			delay: 300
		})

		const { data: selectedProducts, isError: isSelectedProductsError } =
			useQuery({
				queryKey: ['selected products', selectedItems],
				queryFn: () => productService.getByIds(selectedItems),
				placeholderData: keepPreviousData,
				enabled: tab === 'selected' && selectedItems.length > 0
			})

		const calcDiscountPrice = React.useCallback(
			(price: number, percent: number) => {
				const discountPrice = (price - (price / 100) * percent).toFixed(0)

				if (discountPercent >= price) return price

				return discountPrice
			},
			[query]
		)

		const isSelectedSet = React.useMemo(() => {
			const map = new Set(selectedItems)
			return map
		}, [selectedItems])

		const displayItems: ProductType[] = React.useMemo(() => {
			if (tab === 'all') return flatItems
			return selectedProducts?.items ?? []
		}, [tab, flatItems, selectedProducts])

		React.useEffect(() => {
			if (isSelectedProductsError) {
				toast.error('Не удалось загрузить выбранные товары')
			}
		}, [isSelectedProductsError])

		if (isLoading) {
			return (
				<div className='gap-1.5 flex flex-col'>
					<div className='w-full h-[140px] flex bg-gray-200 rounded-lg animate-pulse' />
					<div className='w-full h-[140px] flex bg-gray-200 rounded-lg animate-pulse' />
					<div className='w-full h-[140px] flex bg-gray-200 rounded-lg animate-pulse' />
				</div>
			)
		}

		const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
			if (isFetching && tab === 'all' && index === displayItems.length) {
				return (
					<div
						key={key}
						style={style}
						className={styles.loaderItem}
					>
						{isFetching && (
							<Loader2
								className={styles.loader}
								size={24}
							/>
						)}
					</div>
				)
			}

			const item = displayItems[index]

			if (!item) return null

			const discountTarget = item.discount ? item.discount : null

			if (item) {
				return (
					<div
						key={key}
						style={style}
					>
						<ProductSelectItem
							ref={index === flatItems.length - 1 ? ref : null}
							product={item}
							discountPrice={
								discountTarget
									? calcDiscountPrice(
											Number(item.price),
											Number(discountTarget.amount)
										)
									: calcDiscountPrice(Number(item.price), discountPercent)
							}
							isSelected={isSelectedSet.has(item.id)}
							onSelect={onSelect}
						/>
					</div>
				)
			}
		}

		return (
			<React.Fragment>
				<div className={clsx(styles.container, className)}>
					<div className={styles.panel}>
						<div className={styles.topbarPanel}>
							<SmallSearchBar
								className={styles.searchbar}
								onFetch={(query) => onFetch({ query })}
							/>
							<Button
								className={styles.clearButton}
								type='button'
								size='sm'
								variant='transparent'
								onClick={onReset}
							>
								Сбросить все
							</Button>
						</div>
						<div className={styles.tabs}>
							{TABS.map((item) => (
								<Badge
									variant={tab !== item.variant ? 'outlined' : 'contained'}
									onClick={() => setTab(item.variant)}
								>
									{item.name}
								</Badge>
							))}
						</div>
						<FlatCategoryFilter
							selected={filterCategory}
							onSelect={(id) => {
								setFilterCategory(id)
								onFetch({ categoryId: id ?? undefined })
							}}
						/>
					</div>
					<div className={styles.list}>
						{(tab === 'all' && flatItems.length > 0) ||
						(tab === 'selected' && selectedItems.length > 0) ? (
							<AutoSizer disableHeight>
								{({ width }) => (
									<List
										width={width}
										height={636}
										style={{ paddingRight: 4 }}
										rowCount={
											tab === 'all'
												? isFetching
													? displayItems.length + 1
													: displayItems.length
												: selectedItems.length
										}
										rowHeight={({ index }) => {
											return tab === 'all' && index === displayItems.length
												? 40
												: 88
										}}
										rowRenderer={rowRenderer}
										overscanRowCount={5}
									/>
								)}
							</AutoSizer>
						) : (
							<div className={styles.empty}>
								<p className={styles.text}>
									{tab === 'all'
										? 'Ни один товар не найден по результатам поиска...'
										: 'Вы не выбрали ни один товар из списка'}
								</p>
							</div>
						)}
					</div>
				</div>

				{error && (
					<span className={styles.error}>
						<OctagonAlert size={12} /> {error}
					</span>
				)}
			</React.Fragment>
		)
	}
)

ProductSelect.displayName = 'ProductSelect'
