import { api, apiWithHeaders } from '@/api/interceptors/api-instance'

import type {
	DiscountType,
	DiscountsType,
	DiscountParamsType,
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

	async getAll(params?: DiscountParamsType): Promise<DiscountsType> {
		const response = await api.get(this.endpoint, { params })
		return response.data
	}

	async getActual(params?: DiscountParamsType): Promise<DiscountsType> {
		const response = await api.get(`${this.endpoint}/actual`, { params })
		return response.data
	}

	async getOne(id: string): Promise<DiscountType> {
		const response = await api.get(`${this.endpoint}/${id}`)
		return response.data
	}
}

export const discountService = new DiscountService()
