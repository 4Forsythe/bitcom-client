'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import { productService } from '@/services/product.service'

interface ProductsFilters {
	search?: string
	categoryId?: string
}

export function useArchive() {
	const searchParams = useSearchParams()

	const [filters, setFilters] = React.useState<ProductsFilters>({
		search: '',
		categoryId: ''
	})
	const [page, setPage] = React.useState(Number(searchParams.get('page')) || 1)
	const [limit, setLimit] = React.useState(
		Number(searchParams.get('limit')) || 15
	)

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['products', page, limit, filters],
		queryFn: () =>
			productService.getArchive({
				name: filters.search?.trim(),
				categoryId: filters.categoryId,
				take: limit,
				skip: (page - 1) * limit
			}),
		placeholderData: (prev) => prev
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
		refetch: (options: ProductsFilters) => {
			setFilters((prev) => ({ ...prev, ...options }))
		}
	}
}
