import { api } from '@/api/interceptors/api-instance'

import type {
	ProductCategoryType,
	ProductCategoriesType
} from '@/types/product-category.types'

class ProductCategoryService {
	private endpoint = '/product-category'

	async getAll(): Promise<ProductCategoriesType> {
		const response = await api.get(this.endpoint)

		return response.data
	}

	async getOne(id: string): Promise<ProductCategoryType> {
		const response = await api.get(`${this.endpoint}/${id}`)

		return response.data
	}
}

export const productCategoryService = new ProductCategoryService()
