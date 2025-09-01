import {
	type DiscountType,
	DiscountTargetTypeVariables
} from '@/types/discount.types'

export function useDiscountDetails(discount?: DiscountType) {
	if (!discount || !discount.targets) {
		return {
			priority: undefined,
			products: [],
			categoryId: null
		}
	}

	const targetType =
		discount.targets[0].type === DiscountTargetTypeVariables.PRODUCT &&
		discount.targets[0].product?.id
			? 'product'
			: 'category'

	const priority = discount.targets[0].priority

	const categoryId =
		targetType === 'category' ? discount.targets[0].categoryId : null

	if (targetType === 'product') {
		const products = discount.targets
			.filter((target) => target.product?.id)
			.map((target) => target.product!.id)

		return {
			priority,
			products,
			categoryId
		}
	}

	return {
		priority,
		products: [],
		categoryId
	}
}
