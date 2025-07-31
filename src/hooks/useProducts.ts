'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import { productService } from '@/services/product.service'

export function useProducts() {
	const searchParams = useSearchParams()

	const [search, setSearch] = React.useState('')
	const [page, setPage] = React.useState(Number(searchParams.get('page')) || 1)
	const [limit, setLimit] = React.useState(
		Number(searchParams.get('limit')) || 15
	)

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['products', page, limit, search],
		queryFn: () =>
			productService.getArchive({
				name: search.trim(),
				take: limit,
				skip: (page - 1) * limit
			})
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
		refetch: (query: string) => {
			setSearch(query)
		}
	}
}
