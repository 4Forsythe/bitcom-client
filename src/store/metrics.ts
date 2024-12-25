import { create } from 'zustand'

interface IMetricsState {
	viewers: number
	views: number
	setViewers: (count: number) => void
	setViews: (count: number) => void
}

export const useMetricsStore = create<IMetricsState>((set) => ({
	viewers: 0,
	views: 0,
	setViewers: (viewers) => set(() => ({ viewers })),
	setViews: (views) => set(() => ({ views }))
}))
