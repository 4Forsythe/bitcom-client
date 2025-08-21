import type { ProductType } from './product.types'
import type { ProductCategoryType } from './product-category.types'

export const discountTypes = ['percentage', 'fixed'] as const
export type DiscountTypeVariables = (typeof discountTypes)[number]

export type DiscountType = {
	id: string
	name: string
	type: DiscountTypeVariables
	amount: number
	priority: number
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
	priority: number
	products: string[] | []
	categoryId: string | null
	isArchived?: boolean
	startedAt: Date
	expiresAt: Date
}

export type CreateDiscountType = {
	name: string
	type: DiscountTypeVariables
	amount: number
	priority: number
	products: string[] | []
	categoryId: string | null
	isArchived?: boolean
	startedAt: string
	expiresAt: string
}

export type UpdateDiscountType = Partial<CreateDiscountType>
