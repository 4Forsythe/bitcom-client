import { create } from 'zustand'

import type { OrderType, OrdersType } from '@/types/order.types'

interface IOrdersState {
	items: OrderType[]
	count: number
	setOrders: (data: OrdersType) => void
}

export const useOrdersStore = create<IOrdersState>((set) => ({
	items: [],
	count: 0,
	setOrders: (data) => set(() => ({ ...data }))
}))
