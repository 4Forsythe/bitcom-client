import type { ProductType } from './product.types'
import type { ProductCategoryType } from './product-category.types'

export enum DiscountTypeVariables {
	PERCENT = 'PERCENT',
	FIXED = 'FIXED'
}

export enum DiscountTargetTypeVariables {
	PRODUCT = 'PRODUCT',
	CATEGORY = 'CATEGORY'
}

export type DiscountTargetType = {
	id: string
	type: DiscountTargetTypeVariables
	priority: number
	discountId: string
	productId: string | null
	categoryId: string | null
	product: ProductType | null
	category: ProductCategoryType | null
}

export type DiscountType = {
	id: string
	name: string
	type: DiscountTypeVariables
	amount: string
	isArchived: boolean
	targets: DiscountTargetType[]
	startedAt: string
	expiresAt: string
}

export type DiscountsType = {
	items: DiscountType[]
	count: number
}

export type DiscountParamsType = {
	categoryId?: string
	sortBy?: string
	orderBy?: string
	take?: number
	skip?: number
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
