'use client'

import toast from 'react-hot-toast'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useCartStore } from '@/store/cart'
import { cartService } from '@/services/cart.service'

export function useDeleteCartItem() {
	const queryClient = useQueryClient()

	const { setCart } = useCartStore()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['delete cart-item'],
		mutationFn: (id: string) => cartService.remove(id),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			setCart(response)
			toast.success('Товар удален из корзины')
		}
	})

	return {
		deleteCartItem: mutate,
		isDeleteCartItemPending: isPending,
		isDeleteCartItemSuccess: isSuccess,
		isDeleteCartItemError: isError
	}
}
