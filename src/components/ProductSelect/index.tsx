'use client'

import React from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { Loader2, OctagonAlert } from 'lucide-react'
import { List, AutoSizer, ListRowRenderer } from 'react-virtualized'

import { useDebounce } from '@/hooks/useDebounce'
import { SmallSearchBar } from '../SmallSearchBar'
import { ProductSelectItem } from './ProductSelectItem'

import type { ProductsType, ProductType } from '@/types/product.types'

import styles from './product-select.module.scss'

interface Props {
	items: ProductsType[]
	selectedItems: string[]
	isLoading?: boolean
	isFetching?: boolean
	error?: string
	className?: string
	onSelect: (item: ProductType) => void
	onFetch: (query: string) => void
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
			onFetch
		},
		ref
	) => {
		const { watch } = useFormContext()

		const discountPercent: number = watch('amount')
		const flatItems = items.flatMap((item) => item.items)

		const { query } = useDebounce({
			value: String(discountPercent),
			delay: 300
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
			if (isFetching && index === flatItems.length) {
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

			const item = flatItems[index]

			if (item) {
				return (
					<div
						key={key}
						style={style}
					>
						<ProductSelectItem
							ref={index === flatItems.length - 1 ? ref : null}
							product={item}
							discountPrice={calcDiscountPrice(
								item.discountPrice
									? Number(item.discountPrice)
									: Number(item.price),
								discountPercent
							)}
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
						<SmallSearchBar
							className={styles.searchbar}
							onFetch={onFetch}
						/>
					</div>
					<div className={styles.list}>
						{flatItems.length > 0 ? (
							<AutoSizer disableHeight>
								{({ width }) => (
									<List
										width={width}
										height={636}
										style={{ paddingRight: 4 }}
										rowCount={
											isFetching ? flatItems.length + 1 : flatItems.length
										}
										rowHeight={({ index }) => {
											return index === flatItems.length ? 40 : 88
										}}
										rowRenderer={rowRenderer}
										overscanRowCount={5}
									/>
								)}
							</AutoSizer>
						) : (
							<div className={styles.empty}>
								<p className={styles.text}>
									Не нашли ни один товар по результатам поиска...
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
