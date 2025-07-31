'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { productService } from '@/services/product.service'

import type { UploadImagesPayloadType } from '@/types/product.types'

export const useUploadImages = () => {
	const queryClient = useQueryClient()

	const { mutate, mutateAsync, isPending, isSuccess, isError, error } =
		useMutation({
			mutationKey: ['upload images'],
			mutationFn: ({ id, dto }: { id: string; dto: UploadImagesPayloadType }) =>
				productService.uploadImages(id, dto),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['products'] })
			},
			onError: () => {
				toast.error('Возникла проблема при загрузке изображения')
			}
		})

	return {
		uploadImages: mutate,
		uploadImagesAsync: mutateAsync,
		isUploadImagesPending: isPending,
		isUploadImagesSuccess: isSuccess,
		isUploadImagesError: isError,
		uploadImagesError: error
	}
}
