import { api } from '@/api/interceptors/api-instance'

import type {
	ProductCharacteristicType,
	ProductCharacteristicsType,
	ProductCharacteristicParamsType
} from '@/types/product.types'

class DeviceService {
	private endpoint = '/device'

	async getAll(
		params?: ProductCharacteristicParamsType
	): Promise<ProductCharacteristicsType> {
		const response = await api.get(this.endpoint, { params })

		return response.data
	}

	async getOne(id: string): Promise<ProductCharacteristicType> {
		const response = await api.get(`${this.endpoint}/${id}`)

		return response.data
	}
}

export const deviceService = new DeviceService()
