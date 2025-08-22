'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCartStore } from '@/store/cart'
import { cartService } from '@/services/cart.service'

import type { CartItemFormType } from '@/types/cart.types'

export const useCreateCartItem = () => {
	const queryClient = useQueryClient()

	const { setCart } = useCartStore()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['create cart-item'],
		mutationFn: (dto: CartItemFormType) => cartService.create(dto),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			setCart(response)
			toast.success('Товар добавлен в корзину')
		},
		onError: (error) => {
			toast.error(
				axios.isAxiosError(error)
					? error.response?.data.message
					: 'Ошибка при добавлении товара в корзину'
			)
		}
	})

	return {
		createCartItem: mutate,
		isCreateCartItemPending: isPending,
		isCreateCartItemSuccess: isSuccess,
		isCreateCartItemError: isError
	}
}
