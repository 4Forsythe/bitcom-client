import { create } from 'zustand'

import type { WishlistType, WishlistItemType } from '@/types/wishlist.types'

interface IWishlistState {
	items: WishlistItemType[]
	createdAt: string
	updatedAt: string
	setWishlist: (data: WishlistType) => void
}

export const useWishlistStore = create<IWishlistState>((set) => ({
	items: [],
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	setWishlist: (data) =>
		set(() => ({
			items: data.items,
			createdAt: data.createdAt,
			updatedAt: data.updatedAt
		}))
}))
