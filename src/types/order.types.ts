import { ProductType } from './product.types'

export enum GettingType {
	PICKUP = 'Самовывоз'
}

export enum PaymentType {
	CARD = 'Банковской картой онлайн',
	CASH = 'При получении'
}

export type OrderItemType = {
	id: string
	product: ProductType
	productId: string
	count: number
}

export type OrderFormType = {
	customerName: string
	customerEmail: string
	customerPhone: string
	address?: string
	comment?: string
	gettingMethod: GettingType
	paymentMethod: PaymentType
}

export type OrderType = {
	id: string

	total: number
	items: OrderItemType[]
	customerName: string
	customerEmail: string
	customerPhone: string
	address?: string
	comment?: string
	status: string
	gettingMethod: string
	paymentMethod: string

	createdAt: string
	updatedAt: string
}

export type OrdersType = {
	items: OrderType[]
	count: number
}

export type OrderParamsType = {
	take?: number
	skip?: number
}
