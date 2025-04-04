import { create } from 'zustand'

import type { ProductType } from '@/types/product.types'

interface IProductListState {
	products: ProductType[]
	count: number
	isLoading: boolean
	setProducts: (data: ProductType[], count: number) => void
	combineProducts: (data: ProductType[], count: number) => void
	setIsLoading: (state: boolean) => void
}

export const useProductListStore = create<IProductListState>((set) => ({
	products: [],
	count: 0,
	isLoading: true,
	setProducts: (data, count) =>
		set(() => ({
			products: data,
			count: count
		})),
	combineProducts: (data, count) =>
		set((state) => ({
			products: [...state.products, ...data],
			count: count
		})),
	setIsLoading: (state) =>
		set(() => ({
			isLoading: state
		}))
}))
