import { ProductCategoryType } from './product-category.types'
import type { ProductType } from './product.types'

export const discountTypes = ['percentage', 'fixed'] as const
export type DiscountTypeVariables = (typeof discountTypes)[number]

export type DiscountType = {
	id: string
	name: string
	type: DiscountTypeVariables
	amount: number
	products: ProductType[] | []
	category: ProductCategoryType | null
	categoryId: string | null
	isArchived: boolean
	startedAt: string
	expiresAt: string
}

export type DiscountFormType = {
	name: string
	type: DiscountTypeVariables
	amount: number
	products: string[] | []
	categoryId?: string
	isArchived?: boolean
	startedAt: Date
	expiresAt: Date
}
