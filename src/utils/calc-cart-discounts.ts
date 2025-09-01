import { calcProductPriceValue } from './calc-product-price-value'

import type { CartItemType } from '@/types/cart.types'

export const calcCartDiscounts = (cart: CartItemType[]) => {
	const discountDifference = cart.reduce((sum, item) => {
		if (!item.product.discountPrice) return sum

		const discountValue = calcProductPriceValue(
			item.product.price,
			item.product.discountPrice
		)

		return sum + (Number(item.product.price) - discountValue) * item.count
	}, 0)

	const discountProducts = cart
		.map((item) => item.product.discountPrice !== null)
		.filter(Boolean).length

	return {
		discountDifference,
		discountProducts
	}
}
