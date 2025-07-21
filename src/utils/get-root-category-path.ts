import { findParentCategory } from './find-parent-cateogry'

import type { ProductCategoryType } from '@/types/product-category.types'

export const getRootCategoryPath = (
	categories: ProductCategoryType[],
	category: ProductCategoryType
) => {
	const path: string[] = []
	let current: ProductCategoryType | undefined = category

	while (current) {
		path.unshift(current.id)
		current = findParentCategory(categories, current.parentId)
	}

	return path
}
