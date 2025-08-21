'use client'

import React from 'react'
import clsx from 'clsx'
import { OctagonAlert, X } from 'lucide-react'

import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './product-category-select.module.scss'

interface Props {
	items: ProductCategoryType[]
	selectedItem: string | null
	isLoading?: boolean
	error?: string
	className?: string
	onSelect: (item: ProductCategoryType | null) => void
}

export const ProductCategorySelect: React.FC<Props> = ({
	items,
	selectedItem,
	isLoading,
	error,
	className,
	onSelect
}) => {
	if (isLoading) {
		return (
			<div className='gap-1.5 flex flex-col'>
				<div className='w-2/3 h-[40px] flex bg-gray-200 rounded-lg animate-pulse' />
				<div className='w-full h-[40px] flex bg-gray-200 rounded-lg animate-pulse' />
			</div>
		)
	}

	return (
		<React.Fragment>
			<ul className={clsx(styles.container, className)}>
				{items.map((item) => (
					<li
						key={item.id}
						className={clsx(styles.item, {
							[styles.active]: selectedItem === item.id
						})}
					>
						<button
							type='button'
							className={styles.button}
							onClick={() => {
								if (selectedItem !== item.id) onSelect(item)
							}}
						>
							{item.name}
						</button>
						{selectedItem === item.id && (
							<button
								type='button'
								className={clsx(styles.buttonIcon, 'animate-opacity')}
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

			{error && (
				<span className={styles.error}>
					<OctagonAlert size={12} /> {error}
				</span>
			)}
		</React.Fragment>
	)
}
