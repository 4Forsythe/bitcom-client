'use client'

import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useCartStore } from '@/store/cart'
import { cartService } from '@/services/cart.service'

export function useDeleteCart() {
	const queryClient = useQueryClient()

	const { setCart } = useCartStore()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['delete cart'],
		mutationFn: () => cartService.clear(),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			setCart(response)
		}
	})

	return {
		deleteCart: mutate,
		isDeleteCartPending: isPending,
		isDeleteCartSuccess: isSuccess,
		isDeleteCartError: isError
	}
}
