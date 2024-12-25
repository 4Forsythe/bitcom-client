'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useFiltersStore } from '@/store/filters'
import { deviceService } from '@/services/device.service'

import type { ProductCharacteristicsType } from '@/types/product.types'

export const useDevices = (initialData?: ProductCharacteristicsType) => {
	const { setDevices } = useFiltersStore()

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['devices'],
		queryFn: () => deviceService.getAll({ take: 12 }),
		initialData
	})

	React.useEffect(() => {
		if (isSuccess) setDevices(data)
	}, [isSuccess])

	return {
		devices: data,
		isDevicesLoading: isLoading,
		isDevicesSuccess: isSuccess,
		isDevicesError: isError
	}
}
