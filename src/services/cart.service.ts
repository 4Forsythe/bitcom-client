import { apiWithHeaders } from '@/api/interceptors/api-instance'

import type { CartType, CartItemFormType } from '@/types/cart.types'

class CartService {
	private endpoint = '/cart'

	async create(data: CartItemFormType): Promise<CartType> {
		const response = await apiWithHeaders.post<CartType>(this.endpoint, data)

		return response.data
	}

	async getAll(): Promise<CartType> {
		const response = await apiWithHeaders.get(this.endpoint)

		return response.data
	}

	async update(id: string, data: CartItemFormType): Promise<CartType> {
		const response = await apiWithHeaders.patch<CartType>(
			`${this.endpoint}/${id}`,
			data
		)

		return response.data
	}

	async remove(id: string): Promise<CartType> {
		const response = await apiWithHeaders.delete<CartType>(
			`${this.endpoint}/${id}`
		)

		return response.data
	}

	async clear(): Promise<CartType> {
		const response = await apiWithHeaders.delete<CartType>(this.endpoint)

		return response.data
	}
}

export const cartService = new CartService()
