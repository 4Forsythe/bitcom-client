import { api } from '@/api/interceptors/api-instance'
import type {
	DiscountType,
	DiscountsType,
	DiscountParams
} from '@/types/discount.types'
import { EmailFormType } from '@/types/email.types'

class EmailService {
	private endpoint = '/email'

	async create(data: EmailFormType): Promise<EmailFormType> {
		const response = await api.post(this.endpoint, data)

		return response.data
	}
}

export const emailService = new EmailService()
