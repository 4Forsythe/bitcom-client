import type { ProductCategoryType } from './product-category.types'
import type { DiscountType, DiscountTargetType } from './discount.types'

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

export type ProductImageType = {
	id: string
	url: string
	productId: string
	sortOrder: number
}

export type ProductDiscountType = {
	id: string
	name: string
	type: DiscountType
	targetType: DiscountTargetType
	amount: string
	priority: number
	startedAt: string
	expiresAt: string
}

export type ProductType = {
	id: string
	slug: string
	name: string
	images: ProductImageType[] | []
	description?: string
	count?: number
	price: string
	discountPrice?: string
	discount?: ProductDiscountType
	sku: string[]
	guarantee?: number
	isArchived: boolean
	isPublished: boolean
	category: ProductCategoryType
	createdAt: string
	updatedAt: string
	archivedAt: string
}

export type ProductsType = {
	items: ProductType[]
	count: number
}

export type ProductParamsType = {
	id?: string
	name?: string
	categoryId?: string
	discountId?: string
	onlyOriginalPrice?: boolean
	sortBy?: string
	orderBy?: string
	take?: number
	skip?: number
}

export type ArchiveProductParamsType = ProductParamsType & {
	type?: 'all' | 'archive' | 'unpublished'
}

export type ProductFormType = {
	name: string
	description?: string
	price: string
	count?: string
	discountPrice?: string
	sku?: string
	guarantee?: string
	isArchived?: boolean
	isPublished?: boolean
	categoryId: string
}

export type CreateProductType = {
	name: string
	description?: string
	price: number
	discountPrice: number | null
	count: number | null
	sku: string[]
	guarantee?: number
	isArchived?: boolean
	isPublished?: boolean
	categoryId: string
}

export type UpdateProductType = Partial<CreateProductType>

export type UploadImagesPayloadType = {
	images: {
		file: File
		order: number
	}[]
	preserved: {
		id: string
		sortOrder: number
	}[]
}
