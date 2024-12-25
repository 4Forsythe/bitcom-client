'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useMetricsStore } from '@/store/metrics'
import { metricsService } from '@/services/metrics.service'

export const useIncrementViewers = () => {
	const queryClient = useQueryClient()

	const { setViewers } = useMetricsStore()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['increment viewers'],
		mutationFn: () => metricsService.incrementViewers(),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['metrics'] })
			setViewers(Number(response.viewers))
		}
	})

	return {
		incrementViewers: mutate,
		isIncrementViewersPending: isPending,
		isIncrementViewersSuccess: isSuccess,
		isIncrementViewersError: isError
	}
}
