'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useFiltersStore } from '@/store/filters'
import { productCategoryService } from '@/services/product-category.service'

import type { ProductCharacteristicsType } from '@/types/product.types'

export const useProductCategories = (
	initialData?: ProductCharacteristicsType
) => {
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
