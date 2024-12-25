import { api } from '@/api/interceptors/api-instance'

import type { MetricsType } from '@/types/metrics.types'

class MetricsService {
	private endpoint = '/metrics'

	async getAll(): Promise<MetricsType> {
		const response = await api.get<MetricsType>(this.endpoint)

		return response.data
	}

	async incrementViewers(): Promise<MetricsType> {
		const response = await api.patch<MetricsType>(`${this.endpoint}/viewers`)

		return response.data
	}

	async incrementViews(): Promise<MetricsType> {
		const response = await api.patch<MetricsType>(`${this.endpoint}/views`)

		return response.data
	}
}

export const metricsService = new MetricsService()
