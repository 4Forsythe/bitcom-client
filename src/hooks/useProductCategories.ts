'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useFiltersStore } from '@/store/filters'
import { productCategoryService } from '@/services/product-category.service'

import type {
	ProductCategoriesType,
	ProductCategoryParamsType
} from '@/types/product-category.types'

export const useProductCategories = (
	initialData?: ProductCategoriesType,
	options?: {
		enable?: boolean
		params?: ProductCategoryParamsType
	}
) => {
	const { setProductCategories } = useFiltersStore()

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['product-categories', options?.params],
		queryFn: () => productCategoryService.getAll(options?.params),
		initialData,
		enabled: options?.enable ?? true
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
