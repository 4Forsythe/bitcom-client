import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cartService } from '@/services/cart.service'
import type { CartItemFormType } from '@/types/cart.types'
import { useCartStore } from '@/store/cart'

export const useUpdateCartItem = () => {
	const queryClient = useQueryClient()

	const { setCart } = useCartStore()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['update cart-item'],
		mutationFn: ({ id, data }: { id: string; data: CartItemFormType }) =>
			cartService.update(id, data),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			setCart(response)
		}
	})

	return {
		updateCartItem: mutate,
		isUpdateCartItemPending: isPending,
		isUpdateCartItemSuccess: isSuccess,
		isUpdateCartItemError: isError
	}
}
