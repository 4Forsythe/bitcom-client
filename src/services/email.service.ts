import { api } from '@/api/interceptors/api-instance'

import { EmailFormType } from '@/types/email.types'
import { ServiceCenterFormType } from '@/types/service-center-form.types'

class EmailService {
	private endpoint = '/email'

	async create(data: EmailFormType): Promise<EmailFormType> {
		const response = await api.post(this.endpoint, data)
		return response.data
	}

	async sendServiceRequest(data: ServiceCenterFormType): Promise<void> {
		const response = await api.post('send-service-request', data)
		return response.data
	}
}

export const emailService = new EmailService()
