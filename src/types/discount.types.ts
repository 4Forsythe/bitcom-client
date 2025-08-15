export const discountTypes = ['percentage', 'fixed'] as const
export type DiscountTypeVariables = (typeof discountTypes)[number]

export type DiscountFormType = {
	name: string
	type: DiscountTypeVariables
	value: number
	products: string[] | []
	categoryId?: string
	isExpired?: boolean
	startedAt: Date
	expiresAt: Date
}
