'use client'

import React from 'react'

import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query'

import { getSearchParams } from '@/utils/get-search-params'
import { productService } from '@/services/product.service'

interface IUseInfiniteProducts {
	params: ReturnType<typeof getSearchParams>
	enabled?: boolean
}

export function useInfiniteProducts({
	params,
	enabled = true
}: IUseInfiniteProducts) {
	const {
		query,
		category,
		device,
		brand,
		model,
		sortBy,
		orderBy,
		page,
		limit
	} = params

	const skip = page * limit

	const {
		data,
		status,
		isLoading,
		isSuccess,
		isError,
		hasNextPage,
		fetchNextPage
	} = useInfiniteQuery({
		queryKey: ['products', page],
		queryFn: ({ pageParam = skip || 15 }) =>
			productService.getAll({
				name: query,
				categoryId: category,
				deviceId: device,
				brandId: brand,
				modelId: model,
				sortBy: sortBy,
				orderBy: orderBy,
				take: 15,
				skip: pageParam
			}),
		initialPageParam: skip || 15,
		getNextPageParam: (lastPage, allPages) => {
			const total =
				allPages.reduce((sum, page) => sum + page.items.length, 0) + skip

			return total < lastPage.count ? total : undefined
		},
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
		enabled
	})

	const { ref, inView } = useInView()

	React.useEffect(() => {
		if (inView && hasNextPage) fetchNextPage()
	}, [inView, hasNextPage])

	return {
		products: data,
		status,
		isProductsLoading: isLoading,
		isProductsSuccess: isSuccess,
		isProductsError: isError,
		fetchNextPage,
		intersectionRef: ref
	}
}
