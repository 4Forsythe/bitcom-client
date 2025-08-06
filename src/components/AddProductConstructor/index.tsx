'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import {
	Button,
	Heading,
	AddProductForm,
	ProductEditingAlert
} from '@/components'
import { AddProductCategoryItem } from './add-product-category-item'

import { productService } from '@/services/product.service'
import { useProductCategories } from '@/hooks/useProductCategories'
import { findLatestCategory } from '@/utils/find-latest-category'
import { getRootCategoryPath } from '@/utils/get-root-category-path'
import { getFullCategoryPath } from '@/utils/get-full-category-path'

import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './add-product.module.scss'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'

export const AddProductConstructor: React.FC = () => {
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

	const latestCategory = React.useMemo(() => {
		if (!product?.category) return undefined
		return findLatestCategory(product.category)
	}, [product?.category])

	const [targetCategory, setTargetCategory] = React.useState<
		ProductCategoryType | undefined
	>(latestCategory)
	const [isShowForm, setIsShowForm] = React.useState(false)
	const [categoryTree, setCategoryTree] = React.useState<string[]>([])
	const [nestedItems, setNestedItems] = React.useState<ProductCategoryType[][]>(
		[]
	)

	const {
		productCategories,
		isProductCategoriesLoading,
		isProductCategoriesSuccess
	} = useProductCategories()

	const onSelectCategory = (category: ProductCategoryType, nesting: number) => {
		onDropdownCategory(category, nesting)
		setIsShowForm(true)
	}

	const onDropdownCategory = (
		category: ProductCategoryType,
		nesting: number
	) => {
		if (!productCategories) return

		setTargetCategory(category)
		setNestedItems([...nestedItems.slice(0, nesting), category.children])
		setCategoryTree(getRootCategoryPath(productCategories.items, category))
	}

	const handleBackToCategory = (
		category: ProductCategoryType,
		nesting: number
	) => {
		if (!productCategories) return

		setIsShowForm(false)
		setTargetCategory(category)
		setNestedItems((prev) => prev.slice(0, nesting))
		setCategoryTree(getRootCategoryPath(productCategories.items, category))
	}

	React.useEffect(() => {
		queryClient.removeQueries({ queryKey: [productId] })
	}, [productId])

	React.useEffect(() => {
		if (product) {
			setIsShowForm(true)
		}
	}, [productId, product, isProductSuccess])

	React.useEffect(() => {
		if (
			product?.category &&
			latestCategory &&
			isProductCategoriesSuccess &&
			productCategories &&
			productCategories.items.length > 0
		) {
			const fullPath = getFullCategoryPath(
				productCategories.items,
				latestCategory
			)

			const ids = fullPath.map((cat) => cat.id)
			setCategoryTree(ids)

			const nestedLevels: ProductCategoryType[][] = []
			for (let i = 0; i < fullPath.length - 1; i++) {
				nestedLevels.push(fullPath[i].children)
			}
			setNestedItems(nestedLevels)

			setTargetCategory(fullPath[fullPath.length - 1])
		}
	}, [product, isProductSuccess, productCategories, isProductCategoriesSuccess])

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<Heading
					title={product ? 'Черновик' : 'Добавить новый товар'}
					control
				/>
				{!isProductLoading &&
					!isProductCategoriesLoading &&
					productCategories &&
					targetCategory &&
					isShowForm && (
						<div className={styles.breadcrumbs}>
							{getFullCategoryPath(productCategories.items, targetCategory).map(
								(item, index) => (
									<React.Fragment key={item.id}>
										{item.parentId && <ChevronRight size={16} />}
										<button
											className={styles.breadcrumbItem}
											key={item.id}
											onClick={() => handleBackToCategory(item, index + 1)}
										>
											{item.name}
										</button>
									</React.Fragment>
								)
							)}
						</div>
					)}
				{product && (
					<div className={styles.block}>
						<div className={styles.subheading}>
							<ProductEditingAlert product={product} />
						</div>
					</div>
				)}
				{!isProductLoading &&
				!isProductCategoriesLoading &&
				productCategories &&
				targetCategory &&
				isShowForm ? (
					<AddProductForm
						product={product}
						category={targetCategory}
					/>
				) : (
					<div className={clsx(styles.block, { [styles.spacing]: product })}>
						{!isProductLoading && !isProductCategoriesLoading && (
							<p className={styles.caption}>
								{product
									? 'Вы можете изменить категорию товара или оставить как есть'
									: 'Выберите подходящую категорию'}
							</p>
						)}
						<div className={styles.list}>
							{isProductLoading || isProductCategoriesLoading ? (
								<React.Fragment>
									{[...new Array(3)].map((_, index) => (
										<div
											className='w-full h-[300px] bg-gray-200 rounded-md animate-pulse'
											key={index}
										/>
									))}
								</React.Fragment>
							) : (
								<ul className={styles.categories}>
									{productCategories &&
										productCategories.items.map((item) => (
											<AddProductCategoryItem
												key={item.id}
												item={item}
												nesting={0}
												isSelected={categoryTree.includes(item.id)}
												onSelect={onSelectCategory}
												onDropdown={onDropdownCategory}
											/>
										))}
								</ul>
							)}

							{nestedItems.length > 0 &&
								nestedItems.map(
									(items, index) =>
										items.length > 0 && (
											<ul
												className={styles.categories}
												key={index}
											>
												{items.map((item) => (
													<AddProductCategoryItem
														key={item.id}
														item={item}
														nesting={index + 1}
														isSelected={categoryTree.includes(item.id)}
														onSelect={onSelectCategory}
														onDropdown={onDropdownCategory}
													/>
												))}
											</ul>
										)
								)}
						</div>

						{/* {isProductCategoriesSuccess && targetCategory && (
							<div className={styles.confirm}>
								<p className={styles.confirmText}>
									{product
										? latestCategory?.id === targetCategory.id
											? `Оставить категорию "${targetCategory.name}"?`
											: `Изменить категорию на "${targetCategory.name}"?`
										: `Выбрать категорию "${targetCategory.name}"?`}
								</p>
								<Button
									className={styles.confirmButton}
									variant={
										product && latestCategory?.id === targetCategory.id
											? 'outlined'
											: 'contained'
									}
									onClick={() => setIsShowForm(true)}
								>
									{product
										? latestCategory?.id === targetCategory.id
											? 'Да, оставить'
											: 'Да, изменить'
										: 'Да, продолжить'}
								</Button>
							</div>
						)} */}
					</div>
				)}
			</div>
		</div>
	)
}
