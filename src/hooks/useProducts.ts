'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import { useQuery, keepPreviousData } from '@tanstack/react-query'

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

export function useProducts(
	type: 'all' | 'archive' = 'all',
	options?: ProductsFilters
) {
	const searchParams = useSearchParams()

	const [filters, setFilters] = React.useState<ProductsFilters>(
		options || {
			search: '',
			categoryId: ''
		}
	)
	const [page, setPage] = React.useState(Number(searchParams.get('page')) || 1)
	const [limit, setLimit] = React.useState(
		Number(searchParams.get('limit')) || 15
	)

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['products', page, limit, filters],
		queryFn: () =>
			type === 'all'
				? productService.getAll({
						name: filters.search?.trim(),
						categoryId: filters.categoryId,
						take: limit,
						skip: (page - 1) * limit
					})
				: productService.getArchive({
						name: filters.search?.trim(),
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
		products: data,
		isProductsLoading: isLoading,
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
		}
	}
}
