export type DiscountType = {
	id: string
	dateBegin: string
	dateEnd: string
	percent: number
	target: string
	targetId: string
	type: string
}

export type DiscountsType = {
	items: DiscountType[]
	count: number
}

export type DiscountParams = {
	take?: number
	skip?: number
}
