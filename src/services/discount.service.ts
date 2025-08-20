import { api } from '@/api/interceptors/api-instance'

class DiscountService {
	private endpoint = '/discounts'

	async getAll() {
		const response = await api.get(this.endpoint)
		return response.data
	}

	async getOne(id: string) {
		const response = await api.get(`${this.endpoint}/${id}`)
		return response.data
	}
}

export const discountService = new DiscountService()
