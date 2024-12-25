import { create } from 'zustand'

import type { CartType, CartItemType } from '@/types/cart.types'

interface ICartState {
	items: CartItemType[]
	count: number
	total: number
	createdAt: string
	updatedAt: string
	setCart: (data: CartType) => void
}

export const useCartStore = create<ICartState>((set) => ({
	items: [],
	count: 0,
	total: 0,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	setCart: (data) =>
		set(() => ({
			items: data.items,
			count: data.count,
			total: data.total,
			createdAt: data.createdAt,
			updatedAt: data.updatedAt
		}))
}))
