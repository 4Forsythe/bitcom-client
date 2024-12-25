import { create } from 'zustand'

import type { ProductCharacteristicsType } from '@/types/product.types'

interface IFiltersState {
	productCategories: ProductCharacteristicsType | null
	postCategories: ProductCharacteristicsType | null
	devices: ProductCharacteristicsType | null
	setProductCategories: (data: ProductCharacteristicsType | null) => void
	setPostCategories: (data: ProductCharacteristicsType | null) => void
	setDevices: (data: ProductCharacteristicsType | null) => void
}

export const useFiltersStore = create<IFiltersState>((set) => ({
	productCategories: null,
	postCategories: null,
	devices: null,
	setProductCategories: (productCategories) =>
		set(() => ({ productCategories })),
	setPostCategories: (postCategories) => set(() => ({ postCategories })),
	setDevices: (devices) => set(() => ({ devices }))
}))
