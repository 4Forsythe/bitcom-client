'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { productService } from '@/services/product.service'

import type { UpdateProductType } from '@/types/product.types'

export const useUpdateProduct = () => {
	const queryClient = useQueryClient()

	const { mutate, mutateAsync, isPending, isSuccess, isError, error } =
		useMutation({
			mutationKey: ['update product'],
			mutationFn: ({ id, dto }: { id: string; dto: UpdateProductType }) =>
				productService.update(id, dto),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['products'] })
				toast.success('Информация о товаре обновлена')
			},
			onError: () => {
				toast.error('Возникла проблема при обновлении товара')
			}
		})

	return {
		updateProduct: mutate,
		updateProductAsync: mutateAsync,
		isUpdateProductPending: isPending,
		isUpdateProductSuccess: isSuccess,
		isUpdateProductError: isError,
		updateProductError: error
	}
}
