'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useWishlistStore } from '@/store/wishlist'
import { wishlistService } from '@/services/wishlist.service'

import type { WishlistItemFormType } from '@/types/wishlist.types'

export const useCreateWishlistItem = () => {
	const queryClient = useQueryClient()

	const { setWishlist } = useWishlistStore()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['create wishlist-item'],
		mutationFn: (data: WishlistItemFormType) => wishlistService.create(data),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['wishlist'] })
			setWishlist(response)
		}
	})

	return {
		createWishlistItem: mutate,
		isCreateWishlistItemPending: isPending,
		isCreateWishlistItemSuccess: isSuccess,
		isCreateWishlistItemError: isError
	}
}
