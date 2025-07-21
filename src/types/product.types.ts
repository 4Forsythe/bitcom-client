import type { ProductCategoryType } from './product-category.types'

export type ProductCharacteristicType = {
	id: string
	name: string
	imageUrl?: string
}

export type ProductCharacteristicsType = {
	items: ProductCharacteristicType[]
	count: number
}

export type ProductCharacteristicParamsType = {
	take?: number
	skip?: number
}

export type ProductType = {
	id: string

	name: string
	description?: string
	price: string
	count: number
	barcode: string[]
	imageUrl?: string
	model?: string

	category?: ProductCategoryType
	device?: ProductCharacteristicType
	brand?: ProductCharacteristicType

	createdAt: string
}

export type ProductsType = {
	items: ProductType[]
	count: number
}

export type ProductParamsType = {
	id?: string
	name?: string
	categoryId?: string
	deviceId?: string
	brandId?: string
	modelId?: string
	sortBy?: string
	orderBy?: string
	take?: number
	skip?: number
}

export type CreateProductType = {
	name: string
	description?: string
	price: number
	count?: number
	sku?: string[]
	isArchived?: boolean
	isPublished?: boolean
	categoryId: string
}
