import { api } from '@/api/interceptors/api-instance'

import type {
	ProductCategoryType,
	ProductCategoriesType,
	ProductCategoryParamsType
} from '@/types/product-category.types'

class ProductCategoryService {
	private endpoint = '/product-category'

	async getAll(
		params?: ProductCategoryParamsType
	): Promise<ProductCategoriesType> {
		const response = await api.get(this.endpoint, { params })

		return response.data
	}

	async getOne(id: string): Promise<ProductCategoryType> {
		const response = await api.get(`${this.endpoint}/${id}`)

		return response.data
	}
}

export const productCategoryService = new ProductCategoryService()
