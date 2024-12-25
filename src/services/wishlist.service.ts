import { apiWithHeaders } from '@/api/interceptors/api-instance'

import type { WishlistItemFormType, WishlistType } from '@/types/wishlist.types'

class WishlistService {
	private endpoint = '/wishlist'

	async create(data: WishlistItemFormType): Promise<WishlistType> {
		const response = await apiWithHeaders.post<WishlistType>(
			this.endpoint,
			data
		)

		return response.data
	}

	async getAll(): Promise<WishlistType> {
		const response = await apiWithHeaders.get<WishlistType>(this.endpoint)

		return response.data
	}

	async remove(id: string): Promise<WishlistType> {
		const response = await apiWithHeaders.delete<WishlistType>(
			`${this.endpoint}/${id}`
		)

		return response.data
	}
}

export const wishlistService = new WishlistService()
