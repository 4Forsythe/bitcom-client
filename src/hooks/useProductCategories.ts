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
	params?: ProductCategoryParamsType
) => {
	const { setProductCategories } = useFiltersStore()

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['product-categories', params],
		queryFn: () => productCategoryService.getAll(params),
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
