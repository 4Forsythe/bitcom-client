import { apiWithHeaders } from '@/api/interceptors/api-instance'
import {
	OrderFormType,
	OrderParamsType,
	OrdersType,
	OrderType
} from '@/types/order.types'
import { PaymentStatusType } from '@/types/payment.types'

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

	async getTotal(): Promise<number> {
		const response = await apiWithHeaders.get<number>(`${this.endpoint}/total`)

		return response.data
	}
}

export const orderService = new OrderService()
