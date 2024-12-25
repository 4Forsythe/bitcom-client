'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import { orderService } from '@/services/order.service'
import { useOrdersStore } from '@/store/orders'

export function useOrders() {
	const searchParams = useSearchParams()
	const { setOrders } = useOrdersStore()

	const [page, setPage] = React.useState(Number(searchParams.get('page')) || 1)
	const [limit, setLimit] = React.useState(
		Number(searchParams.get('limit')) || 10
	)

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['order-list', page, limit],
		queryFn: () =>
			orderService.getAll({ take: limit, skip: (page - 1) * limit })
	})

	React.useEffect(() => {
		setPage(Number(searchParams.get('page')) || 1)
		setLimit(Number(searchParams.get('limit')) || 10)
	}, [searchParams])

	React.useEffect(() => {
		if (isSuccess) setOrders(data)
	}, [isSuccess])

	return {
		orders: data,
		isOrdersLoading: isLoading,
		isOrdersSuccess: isSuccess,
		isOrdersError: isError
	}
}
