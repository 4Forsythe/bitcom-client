import { wp } from '@/api/interceptors/api-instance'

import type { WP_REST_API_Page } from 'wp-types'

class WordpressService {
	async getAllPages(): Promise<WP_REST_API_Page[]> {
		const response = await wp.get<WP_REST_API_Page[]>('/pages')

		return response.data
	}

	async getPage(slug: string): Promise<WP_REST_API_Page> {
		const response = await wp.get<WP_REST_API_Page[]>(`/pages/?slug=${slug}`)

		return response.data && response.data[0]
	}
}

export const wordpressService = new WordpressService()
