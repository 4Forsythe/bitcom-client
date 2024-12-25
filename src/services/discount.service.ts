import { api } from '@/api/interceptors/api-instance'
import type {
	DiscountType,
	DiscountsType,
	DiscountParams
} from '@/types/discount.types'

class DiscountService {
	private endpoint = '/discounts'

	async getAll(params?: DiscountParams): Promise<DiscountsType> {
		const response = await api.get(this.endpoint, { params })
		return response.data
	}

	async getOne(id: string): Promise<DiscountType> {
		const response = await api.get(`${this.endpoint}/${id}`)
		return response.data
	}
}

export const discountService = new DiscountService()
