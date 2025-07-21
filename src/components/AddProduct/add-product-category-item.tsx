import React from 'react'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'

import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './add-product.module.scss'

interface Props {
	item: ProductCategoryType
	nesting: number
	isSelected?: boolean
	onDropdown: (item: ProductCategoryType, nesting: number) => void
}

export const AddProductCategoryItem: React.FC<Props> = ({
	item,
	nesting,
	isSelected,
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
				onClick={() => onDropdown(item, nesting)}
			>
				{item.name}
				{item.children.length > 0 && <ChevronRight size={20} />}
			</button>
		</li>
	)
}
