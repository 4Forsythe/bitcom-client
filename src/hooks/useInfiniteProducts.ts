'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query'

import { productService } from '@/services/product.service'

interface IUseInfiniteProducts {
	query?: string
	enabled?: boolean
}

export function useInfiniteProducts(options?: IUseInfiniteProducts) {
	const searchParams = useSearchParams()

	const [query, setQuery] = React.useState(options?.query || '')
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
		refetch,
		fetchNextPage
	} = useInfiniteQuery({
		queryKey: ['products', query, page, limit],
		queryFn: ({ pageParam = skip }) =>
			productService.getAll({
				name: query.trim(),
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
		enabled: true
	})

	const { ref, inView } = useInView()

	React.useEffect(() => {
		if (inView && hasNextPage) fetchNextPage()
	}, [inView, hasNextPage])

	return {
		products: data,
		status,
		isProductsLoading: isLoading,
		isProductsFetching: isFetching,
		isProductsSuccess: isSuccess,
		isProductsError: isError,
		refetch: (query: string) => {
			setQuery(query)
		},
		fetchNextPage,
		intersectionRef: ref
	}
}
