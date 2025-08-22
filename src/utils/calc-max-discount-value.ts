import { DiscountTypeVariables } from '@/types/discount.types'

export function calcMaxDiscountValue(
	original: string | number,
	discount: string | number | undefined,
	discountTarget:
		| { type: DiscountTypeVariables; amount: string }
		| null
		| undefined
): number | undefined {
	return discountTarget
		? discountTarget.type === DiscountTypeVariables.PERCENT
			? Number(original) -
				(Number(original) / 100) * Number(discountTarget.amount)
			: Number(discountTarget.amount)
		: discount
			? Number(discount)
			: undefined
}
