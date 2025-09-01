import { create } from 'zustand'

import type { DiscountType } from '@/types/discount.types'

interface IDiscountListState {
	discounts: DiscountType[]
	count: number
	isLoading: boolean
	setDiscounts: (data: DiscountType[], count: number) => void
	combineDiscounts: (data: DiscountType[], count: number) => void
	setIsLoading: (state: boolean) => void
}

export const useDiscountListStore = create<IDiscountListState>((set) => ({
	discounts: [],
	count: 0,
	isLoading: true,
	setDiscounts: (data, count) =>
		set(() => ({
			discounts: data,
			count: count
		})),
	combineDiscounts: (data, count) =>
		set((state) => ({
			discounts: [...state.discounts, ...data],
			count: count
		})),
	setIsLoading: (state) =>
		set(() => ({
			isLoading: state
		}))
}))
