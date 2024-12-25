'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useWishlistStore } from '@/store/wishlist'
import { wishlistService } from '@/services/wishlist.service'

export function useWishlist() {
	const { setWishlist } = useWishlistStore()

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['wishlist'],
		queryFn: () => wishlistService.getAll(),
		retry: 0
	})

	React.useEffect(() => {
		if (isSuccess) setWishlist(data)
	}, [isSuccess])

	return {
		wishlist: data,
		isWishlistLoading: isLoading,
		isWishlistSuccess: isSuccess,
		isWishlistError: isError
	}
}
