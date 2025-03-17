import { cloud } from '@/api/interceptors/api-instance'

import type { CloudResouceType } from '@/types/yandex.types'

class YandexCloudService {
	private endpoint = '/disk'

	async getResource(path: string): Promise<CloudResouceType> {
		const response = await cloud.get<CloudResouceType>(
			`${this.endpoint}/resources`,
			{ params: { path } }
		)

		return response.data
	}
}

export const cloudService = new YandexCloudService()
