import { SERVER_BASE_URL } from '@/constants'

import type { DiscountTargetType } from '@/types/discount.types'

export function getDiscountFirstTargetImageUrl(target: DiscountTargetType) {
	const isProduct = target.product

	return isProduct
		? isProduct.images.length > 0
			? `${SERVER_BASE_URL}/${isProduct.images[0].url}`
			: isProduct.category.imageUrl
				? `/static/${isProduct.category.imageUrl}`
				: undefined
		: target.category && target.category.imageUrl
			? `/static/${target.category.imageUrl}`
			: undefined
}
