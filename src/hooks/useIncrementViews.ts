'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useMetricsStore } from '@/store/metrics'
import { metricsService } from '@/services/metrics.service'

export const useIncrementViews = () => {
	const queryClient = useQueryClient()

	const { setViews } = useMetricsStore()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['increment views'],
		mutationFn: () => metricsService.incrementViews(),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['metrics'] })
			setViews(Number(response.views))
		}
	})

	return {
		incrementViews: mutate,
		isIncrementViewsPending: isPending,
		isIncrementViewsSuccess: isSuccess,
		isIncrementViewsError: isError
	}
}
