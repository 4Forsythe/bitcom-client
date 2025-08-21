'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { productService } from '@/services/product.service'

import type { CreateProductType } from '@/types/product.types'

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	const { mutate, mutateAsync, isPending, isSuccess, isError, error } =
		useMutation({
			mutationKey: ['create product'],
			mutationFn: (dto: CreateProductType) => productService.create(dto),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['products'] })
			},
			onError: () => {
				toast.error('Возникла проблема при создании товара')
			}
		})

	return {
		createProduct: mutate,
		createProductAsync: mutateAsync,
		isCreateProductPending: isPending,
		isCreateProductSuccess: isSuccess,
		isCreateProductError: isError,
		createProductError: error
	}
}
