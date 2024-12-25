'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useCartStore } from '@/store/cart'
import { cartService } from '@/services/cart.service'

export function useCart() {
	const { setCart } = useCartStore()

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['cart'],
		queryFn: () => cartService.getAll(),
		retry: 0
	})

	React.useEffect(() => {
		if (isSuccess) setCart(data)
	}, [isSuccess])

	return {
		cart: data,
		isCartLoading: isLoading,
		isCartSuccess: isSuccess,
		isCartError: isError
	}
}
