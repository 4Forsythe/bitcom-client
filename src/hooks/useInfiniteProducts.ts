'use client'

import React from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query'

import { productService } from '@/services/product.service'

interface ProductsRefetchOptions {
	search?: string
	categoryId?: string
	page?: number
}

interface ProductsFilters {
	search?: string
	categoryId?: string
}

interface IUseInfiniteProducts {
	enabled?: boolean
}

export function useInfiniteProducts(
	type: 'all' | 'archive' = 'all',
	options?: IUseInfiniteProducts
) {
	const searchParams = useSearchParams()

	const [filters, setFilters] = React.useState<ProductsFilters>({
		search: '',
		categoryId: ''
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
		refetch,
		fetchNextPage
	} = useInfiniteQuery({
		queryKey: ['products', page, limit, filters],
		queryFn: ({ pageParam = skip }) =>
			type === 'all'
				? productService.getAll({
						name: filters.search?.trim(),
						categoryId: filters.categoryId,
						take: limit,
						skip: pageParam
					})
				: productService.getArchive({
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
		enabled: true
	})

	const { ref, inView } = useInView()

	React.useEffect(() => {
		if (inView && hasNextPage) fetchNextPage()
	}, [inView, hasNextPage])

	React.useEffect(() => {
		if (isError) {
			toast.error('Возникла проблема при запросе товаров')
		}
	}, [isError])

	return {
		products: data,
		status,
		isProductsLoading: isLoading,
		isProductsFetching: isFetching,
		isProductsSuccess: isSuccess,
		isProductsError: isError,
		refetch: (options: ProductsRefetchOptions) => {
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
