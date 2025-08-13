'use client'

import { useMutation } from '@tanstack/react-query'
import { emailService } from '@/services/email.service'

import { ServiceCenterFormType } from '@/types/service-center-form.types'

export function useSendServiceRequest() {
	const { mutate, isPending, isSuccess, isError, error } = useMutation({
		mutationKey: ['service-request'],
		mutationFn: (data: ServiceCenterFormType) =>
			emailService.sendServiceRequest(data)
	})

	return { mutate, isPending, isSuccess, isError, error }
}
