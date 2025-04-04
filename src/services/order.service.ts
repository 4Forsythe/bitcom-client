import { api, apiWithHeaders } from '@/api/interceptors/api-instance'

import type {
	OrderFormType,
	OrderParamsType,
	OrdersType,
	OrderType
} from '@/types/order.types'
import type { PaymentStatusType } from '@/types/payment.types'

interface IGetOrderOptions {
	bearer?: string
	cookies?: string[]
}

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

	async getOne(id: string, options?: IGetOrderOptions): Promise<OrderType> {
		const bearer = options?.bearer ?? ''
		const cookies = options?.cookies ?? []

		if (cookies) {
			const headers = {
				Cookie: cookies.join('; '),
				Authorization: `Bearer ${bearer}`
			}

			const response = await api.get<OrderType>(`${this.endpoint}/${id}`, {
				headers,
				withCredentials: true
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
