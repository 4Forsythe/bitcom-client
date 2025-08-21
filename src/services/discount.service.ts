import { api, apiWithHeaders } from '@/api/interceptors/api-instance'

import type {
	DiscountType,
	CreateDiscountType,
	UpdateDiscountType
} from '@/types/discount.types'

class DiscountService {
	private endpoint = '/discount'

	async create(data: CreateDiscountType): Promise<DiscountType> {
		const response = await apiWithHeaders.post(this.endpoint, data)
		return response.data
	}

	async update(id: string, data: UpdateDiscountType): Promise<DiscountType> {
		const response = await apiWithHeaders.patch(`${this.endpoint}/${id}`, data)
		return response.data
	}
}

export const discountService = new DiscountService()
