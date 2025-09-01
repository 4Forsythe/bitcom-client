'use client'

import React from 'react'
import clsx from 'clsx'
import { X } from 'lucide-react'

import { useProductCategories } from '@/hooks/useProductCategories'

import styles from './flat-category-filter.module.scss'

interface Props {
	selected: string | null
	onSelect: (id: string | null) => void
}

export const FlatCategoryFilter: React.FC<Props> = ({ selected, onSelect }) => {
	const [isCategoriesPopup, setIsCategoriesPopup] = React.useState(false)

	const { productCategories, isProductCategoriesLoading } =
		useProductCategories(undefined, { params: { flat: true } })

	return (
		<div className={styles.container}>
			{isProductCategoriesLoading ? (
				<div className='w-full h-[40px] flex bg-gray-200 rounded-3xl animate-pulse' />
			) : (
				productCategories &&
				productCategories.items.length > 0 && (
					<div className={styles.filter}>
						<span className={styles.title}>Фильтр по категории</span>
						<ul
							className={clsx(styles.list, {
								[styles.popup]: isCategoriesPopup
							})}
						>
							{productCategories.items.map((category) => (
								<li
									key={category.id}
									className={clsx(styles.categoryItem, {
										[styles.active]: selected === category.id
									})}
								>
									<button
										className={styles.categoryButton}
										type='button'
										onClick={() => onSelect(category.id)}
									>
										{category.name}
									</button>
									{selected === category.id && (
										<button
											className={clsx(styles.categoryIcon, 'animate-opacity')}
											type='button'
											onClick={() => onSelect(null)}
										>
											<X
												className={styles.icon}
												size={16}
											/>
										</button>
									)}
								</li>
							))}
						</ul>
						<button
							className={styles.categoryExpandButton}
							type='button'
							onClick={() => setIsCategoriesPopup((prev) => !prev)}
						>
							{isCategoriesPopup ? 'Скрыть список' : 'Раскрыть список'}
						</button>
					</div>
				)
			)}
		</div>
	)
}
