import type { DiscountType, DiscountTargetType } from './discount.types'

export type ProductCategoryParamsType = {
	flat?: boolean
	take?: number
	skip?: number
}

export type ProductCategoryType = {
	id: string
	name: string
	imageUrl?: string
	parentId?: string
	discountTargets: (DiscountTargetType & { discount: DiscountType })[]
	children: ProductCategoryType[]
}

export type ProductCategoriesType = {
	items: ProductCategoryType[]
	count: number
}
