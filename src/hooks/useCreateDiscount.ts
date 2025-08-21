'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { discountService } from '@/services/discount.service'

import type { CreateDiscountType } from '@/types/discount.types'

export const useCreateDiscount = () => {
	const queryClient = useQueryClient()

	const { mutate, mutateAsync, isPending, isSuccess, isError, error } =
		useMutation({
			mutationKey: ['create discount'],
			mutationFn: (dto: CreateDiscountType) => discountService.create(dto),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['discounts'] })
			},
			onError: () => {
				toast.error('Возникла проблема при создании акции')
			}
		})

	return {
		createDiscount: mutate,
		createDiscountAsync: mutateAsync,
		isCreateDiscountPending: isPending,
		isCreateDiscountSuccess: isSuccess,
		isCreateDiscountError: isError,
		createDiscountError: error
	}
}
