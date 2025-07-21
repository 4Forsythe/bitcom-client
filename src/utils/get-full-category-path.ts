import type { ProductCategoryType } from '@/types/product-category.types'

export const getFullCategoryPath = (
	categories: ProductCategoryType[],
	category: ProductCategoryType
) => {
	let fullPath: ProductCategoryType[] = []

	function recursive(
		nodes: ProductCategoryType[],
		path: ProductCategoryType[] = []
	) {
		for (let node of nodes) {
			const updatedPath = [...path, node]

			if (node.id === category.id) {
				fullPath = updatedPath
			}

			if (node.children.length > 0) {
				if (recursive(node.children, updatedPath)) return true
			}
		}

		return false
	}

	recursive(categories)

	return fullPath
}
