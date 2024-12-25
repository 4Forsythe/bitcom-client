'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useWishlistStore } from '@/store/wishlist'
import { wishlistService } from '@/services/wishlist.service'

export const useDeleteWishlistItem = () => {
	const { setWishlist } = useWishlistStore()
	const queryClient = useQueryClient()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['delete wishlist-item'],
		mutationFn: (id: string) => wishlistService.remove(id),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['wishlist'] })
			setWishlist(response)
			toast.success('Товар удален из списка желаемого')
		}
	})

	return {
		deleteWishlistItem: mutate,
		isDeleteWishlistItemPending: isPending,
		isDeleteWishlistItemSuccess: isSuccess,
		isDeleteWishlistItemError: isError
	}
}
