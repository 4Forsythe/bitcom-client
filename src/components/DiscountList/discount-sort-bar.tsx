'use client'

import React from 'react'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

import { DISCOUNT_SORTS, type SortType } from '../SortBar'

import styles from './discount-list.module.scss'

interface IProductSortBar {
	className?: string
}

export const DiscountSortBar: React.FC<IProductSortBar> = ({ className }) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const initializeSorts = (sorts: SortType[]) => {
		return (
			sorts.find(
				(sort) =>
					sort.property === searchParams.get('sortBy') &&
					sort.order === searchParams.get('orderBy')
			) || sorts[0]
		)
	}

	const [sort, setSort] = React.useState<SortType>(
		initializeSorts(DISCOUNT_SORTS)
	)

	const onSortChange = (sort: SortType) => {
		setSort(sort)

		const params = new URLSearchParams(searchParams.toString())
		params.set('sortBy', sort.property)
		params.set('orderBy', sort.order)

		router.push(`?${params.toString()}`)
	}

	return (
		<div className={clsx(styles.sortbar, className)}>
			<ul className={styles.sortItems}>
				{DISCOUNT_SORTS.map((item, index) => (
					<li
						key={index}
						className={styles.sortItem}
					>
						<button
							className={clsx(styles.sortItemSelect, {
								[styles.sortItemActive]: item === sort
							})}
							onClick={() => onSortChange(item)}
						>
							{item.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
