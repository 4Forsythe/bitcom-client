import { api, apiWithHeaders } from '@/api/interceptors/api-instance'

import type {
	OrderFormType,
	OrderParamsType,
	OrdersType,
	OrderType
} from '@/types/order.types'
import type { PaymentStatusType } from '@/types/payment.types'

class OrderService {
	private endpoint = '/order'

	async create(data: OrderFormType): Promise<OrderType & PaymentStatusType> {
		const response = await apiWithHeaders.post<OrderType & PaymentStatusType>(
			this.endpoint,
			data
		)

		return response.data
	}

	async getAll(params?: OrderParamsType): Promise<OrdersType> {
		const response = await apiWithHeaders.get<OrdersType>(
			`${this.endpoint}/me`,
			{ params }
		)

		return response.data
	}

	async getOne(id: string, token?: string): Promise<OrderType> {
		if (token) {
			const headers = { Authorization: `Bearer ${token}` }
			const response = await api.get<OrderType>(`${this.endpoint}/${id}`, {
				headers
			})

			return response.data
		}

		const response = await apiWithHeaders.get<OrderType>(
			`${this.endpoint}/${id}`
		)

		return response.data
	}

	async getTotal(): Promise<number> {
		const response = await apiWithHeaders.get<number>(`${this.endpoint}/total`)

		return response.data
	}
}

export const orderService = new OrderService()
