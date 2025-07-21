import type { ProductCategoryType } from '@/types/product-category.types'

export const findParentCategory = (
	categories: ProductCategoryType[],
	parentId?: string
): ProductCategoryType | undefined => {
	for (let category of categories) {
		if (category.id === parentId) return category
		if (category.children.length > 0) {
			const found = findParentCategory(category.children, parentId)
			if (found) return found
		}
	}

	return undefined
}
