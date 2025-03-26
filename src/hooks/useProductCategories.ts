'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useFiltersStore } from '@/store/filters'
import { productCategoryService } from '@/services/product-category.service'

import type { ProductCategoriesType } from '@/types/product-category.types'

export const useProductCategories = (initialData?: ProductCategoriesType) => {
	const { setProductCategories } = useFiltersStore()

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['product-categories'],
		queryFn: () => productCategoryService.getAll(),
		initialData
	})

	React.useEffect(() => {
		if (isSuccess) setProductCategories(data)
	}, [isSuccess])

	return {
		productCategories: data,
		isProductCategoriesLoading: isLoading,
		isProductCategoriesSuccess: isSuccess,
		isProductCategoriesError: isError
	}
}
