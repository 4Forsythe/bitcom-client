'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useMetricsStore } from '@/store/metrics'
import { metricsService } from '@/services/metrics.service'

export const useMetrics = () => {
	const { setViewers, setViews } = useMetricsStore()

	const { data, error, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['metrics'],
		queryFn: () => metricsService.getAll(),
		retry: 2
	})

	React.useEffect(() => {
		if (isSuccess) {
			setViewers(data.viewers)
			setViews(data.views)
		}
	}, [isSuccess])

	return {
		metrics: data,
		metricsError: error,
		isMetricsLoading: isLoading,
		isMetricsSuccess: isSuccess,
		isMetricsError: isError
	}
}
