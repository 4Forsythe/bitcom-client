'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { discountService } from '@/services/discount.service'

interface DiscountsRefetchOptions {
	categoryId?: string
	page?: number
}

interface DiscountsFilters {
	categoryId?: string
}

export function useDiscounts(type: 'all' | 'archive' = 'all') {
	const searchParams = useSearchParams()

	const [filters, setFilters] = React.useState<DiscountsFilters>({
		categoryId: ''
	})
	const [page, setPage] = React.useState(Number(searchParams.get('page')) || 1)
	const [limit, setLimit] = React.useState(
		Number(searchParams.get('limit')) || 15
	)

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['discounts', page, limit, filters],
		queryFn: () =>
			type === 'all'
				? discountService.getAll({
						categoryId: filters.categoryId,
						take: limit,
						skip: (page - 1) * limit
					})
				: discountService.getArchive({
						categoryId: filters.categoryId,
						take: limit,
						skip: (page - 1) * limit
					}),
		placeholderData: keepPreviousData
	})

	React.useEffect(() => {
		setPage(Number(searchParams.get('page')) || 1)
		setLimit(Number(searchParams.get('limit')) || 15)
	}, [searchParams])

	return {
		discounts: data,
		isDiscountsLoading: isLoading,
		isDiscountsSuccess: isSuccess,
		isDiscountsError: isError,
		refetch: (options: DiscountsRefetchOptions) => {
			if (options.page) setPage(options.page)

			const { categoryId } = options
			setFilters((prev) => ({
				...prev,
				categoryId
			}))
		}
	}
}
