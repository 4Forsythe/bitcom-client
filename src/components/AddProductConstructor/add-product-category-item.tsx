import React from 'react'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'

import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './add-product.module.scss'

interface Props {
	item: ProductCategoryType
	nesting: number
	isSelected?: boolean
	onSelect: (item: ProductCategoryType, nesting: number) => void
	onDropdown: (item: ProductCategoryType, nesting: number) => void
}

export const AddProductCategoryItem: React.FC<Props> = ({
	item,
	nesting,
	isSelected,
	onSelect,
	onDropdown
}) => {
	return (
		<li
			className={clsx(styles.categoryItem, {
				[styles.active]: isSelected
			})}
			key={item.id}
		>
			<button
				className={styles.categoryButton}
				onClick={() => onSelect(item, nesting)}
			>
				{item.name}
			</button>
			{item.children.length > 0 && (
				<button
					className={styles.categoryDropdown}
					onClick={() => onDropdown(item, nesting)}
				>
					<ChevronRight size={20} />
				</button>
			)}
		</li>
	)
}
