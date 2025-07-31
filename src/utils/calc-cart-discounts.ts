import type { CartItemType } from '@/types/cart.types'

export const calcCartDiscounts = (cart: CartItemType[]) => {
	const discountDifference = cart.reduce((acc, item) => {
		if (!item.product.discountPrice) return acc
		return (
			acc +
			(Number(item.product.price) - Number(item.product.discountPrice)) *
				item.count
		)
	}, 0)

	const discountProducts = cart
		.map((item) => item.product.discountPrice !== null)
		.filter(Boolean).length

	return {
		discountDifference,
		discountProducts
	}
}
