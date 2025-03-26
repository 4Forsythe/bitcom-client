import type { ProductCategoryType } from '@/types/product-category.types'

export const findLatestCategory = (
	category: ProductCategoryType
): ProductCategoryType => {
	if (!category.children.length) return category

	return category.children
		.map(findLatestCategory)
		.reduce((latest, child) =>
			getDepth(child) > getDepth(latest) ? child : latest
		)
}

const getDepth = (category: ProductCategoryType, depth = 0): number => {
	if (!category.children.length) return depth

	return Math.max(
		...category.children.map((child) => getDepth(child, depth + 1))
	)
}
