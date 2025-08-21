'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { discountService } from '@/services/discount.service'

import type { UpdateDiscountType } from '@/types/discount.types'

export const useUpdateDiscount = () => {
	const queryClient = useQueryClient()

	const { mutate, mutateAsync, isPending, isSuccess, isError, error } =
		useMutation({
			mutationKey: ['update discount'],
			mutationFn: ({ id, dto }: { id: string; dto: UpdateDiscountType }) =>
				discountService.update(id, dto),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['discounts'] })
				toast.success('Условия акции обновлены')
			},
			onError: () => {
				toast.error('Возникла проблема при обновлении акции')
			}
		})

	return {
		updateDiscount: mutate,
		updateDiscountAsync: mutateAsync,
		isUpdateDiscountPending: isPending,
		isUpdateDiscountSuccess: isSuccess,
		isUpdateDiscountError: isError,
		updateDiscountError: error
	}
}
