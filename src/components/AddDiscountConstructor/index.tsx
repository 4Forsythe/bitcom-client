'use client'

import React from 'react'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import {
	Button,
	Heading,
	AddProductForm,
	ProductEditingAlert,
	AddDiscountForm
} from '@/components'

import { productService } from '@/services/product.service'
import { useProductCategories } from '@/hooks/useProductCategories'
import { findLatestCategory } from '@/utils/find-latest-category'
import { getRootCategoryPath } from '@/utils/get-root-category-path'
import { getFullCategoryPath } from '@/utils/get-full-category-path'

import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './add-discount.module.scss'

export const AddDiscountConstructor: React.FC = () => {
	const queryClient = useQueryClient()
	const searchParams = useSearchParams()

	const productId = searchParams.get('productId')

	const {
		data: product,
		isLoading: isProductLoading,
		isSuccess: isProductSuccess
	} = useQuery({
		queryKey: [productId],
		queryFn: () => productService.getOne(productId!),
		enabled: !!productId
	})

	const {
		productCategories,
		isProductCategoriesLoading,
		isProductCategoriesSuccess
	} = useProductCategories()

	React.useEffect(() => {
		queryClient.removeQueries({ queryKey: [productId] })
	}, [productId])

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<Heading
					title={product ? 'Изменить акцию' : 'Добавить новую акцию'}
					control
				/>
				<AddDiscountForm />
			</div>
		</div>
	)
}
