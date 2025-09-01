'use client'

import React from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query'

import { discountService } from '@/services/discount.service'

interface DiscountsRefetchOptions {
	search?: string
	categoryId?: string
	page?: number
}

interface DiscountsFilters {
	search?: string
	categoryId?: string
}

interface IUseInfiniteDiscounts {
	enabled?: boolean
}

export function useInfiniteDiscounts(
	type: 'all' | 'archive',
	options?: IUseInfiniteDiscounts
) {
	const searchParams = useSearchParams()

	const [filters, setFilters] = React.useState<DiscountsFilters>({
		search: ''
	})
	const [page, setPage] = React.useState(Number(searchParams.get('page')) || 1)
	const [limit, setLimit] = React.useState(
		Number(searchParams.get('limit')) || 15
	)

	const skip = (page - 1) * limit

	const {
		data,
		status,
		isLoading,
		isFetching,
		isSuccess,
		isError,
		hasNextPage,
		fetchNextPage
	} = useInfiniteQuery({
		queryKey: ['discounts', page, limit, filters, type],
		queryFn: ({ pageParam = skip }) =>
			type === 'all'
				? discountService.getAll({
						name: filters.search?.trim(),
						categoryId: filters.categoryId,
						take: limit,
						skip: pageParam
					})
				: discountService.getArchive({
						name: filters.search?.trim(),
						categoryId: filters.categoryId,
						take: limit,
						skip: pageParam
					}),
		initialPageParam: skip,
		getNextPageParam: (lastPage, allPages) => {
			const total =
				allPages.reduce((sum, page) => sum + page.items.length, 0) + skip

			return total < lastPage.count ? total : undefined
		},
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
		enabled: options?.enabled ?? true
	})

	const { ref, inView } = useInView()

	React.useEffect(() => {
		if (inView && hasNextPage) fetchNextPage()
	}, [inView, hasNextPage])

	React.useEffect(() => {
		if (isError) {
			toast.error('Возникла проблема при запросе акций')
		}
	}, [isError])

	return {
		discounts: data,
		status,
		isDiscountsLoading: isLoading,
		isDiscountsFetching: isFetching,
		isDiscountsSuccess: isSuccess,
		isDiscountsError: isError,
		refetch: (options: DiscountsRefetchOptions) => {
			if (options.page) setPage(options.page)

			const { search, categoryId } = options
			setFilters((prev) => ({
				...prev,
				search,
				categoryId
			}))
		},
		fetchNextPage,
		intersectionRef: ref
	}
}
