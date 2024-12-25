import { ProductType } from './product.types'

export type CartItemType = {
	id: string
	product: ProductType
	productId: string
	count: number
}

export type CartItemFormType = {
	productId: string
	count?: number
}

export type CartType = {
	id: string
	items: CartItemType[]
	count: number
	total: number
	token: string
	userId: string
	createdAt: string
	updatedAt: string
}
