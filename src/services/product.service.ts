import { api } from '@/api/interceptors/api-instance'

import type {
	ProductType,
	ProductsType,
	ProductParamsType
} from '@/types/product.types'

class ProductService {
	private endpoint = '/product'

	async getAll(params?: ProductParamsType): Promise<ProductsType> {
		const response = await api.get(this.endpoint, { params })
		return response.data
	}

	async getSimilar(
		id: string,
		params?: { take: number }
	): Promise<ProductsType> {
		const response = await api.get<ProductsType>(
			`${this.endpoint}/similar/${id}`,
			{ params }
		)
		return response.data
	}

	async getByIds(ids: string[]): Promise<ProductsType> {
		const response = await api.post<ProductsType>(this.endpoint, { ids })
		return response.data
	}

	async getOne(id: string): Promise<ProductType> {
		const response = await api.get<ProductType>(`${this.endpoint}/${id}`)
		return response.data
	}

	async getTotal(): Promise<number> {
		const response = await api.get<number>(`${this.endpoint}/total`)
		return response.data
	}
}

export const productService = new ProductService()
