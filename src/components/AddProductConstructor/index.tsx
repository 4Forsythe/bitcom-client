'use client'

import React from 'react'

import {
	Button,
	Heading,
	AddProductForm,
	ProductEditingAlert
} from '@/components'
import { AddProductCategoryItem } from './add-product-category-item'
import { useProductCategories } from '@/hooks/useProductCategories'

import { getRootCategoryPath } from '@/utils/get-root-category-path'
import { getFullCategoryPath } from '@/utils/get-full-category-path'

import type { ProductType } from '@/types/product.types'
import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './add-product.module.scss'
import { findLatestCategory } from '@/utils/find-latest-category'

interface Props {
	product?: ProductType
}

export const AddProductConstructor: React.FC<Props> = ({ product }) => {
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
	}, [product, productCategories, isProductCategoriesSuccess])

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<Heading
					title={product ? 'Черновик' : 'Добавить новый товар'}
					control
				/>
				{productCategories && targetCategory && isShowForm ? (
					<AddProductForm
						product={product}
						category={targetCategory}
						categoryPath={getFullCategoryPath(
							productCategories.items,
							targetCategory
						)}
						onBackToCategory={handleBackToCategory}
					/>
				) : (
					<div className={styles.block}>
						{product && <ProductEditingAlert product={product} />}
						<p className={styles.caption}>
							{product
								? 'Вы можете изменить категорию товара или оставить как есть'
								: 'Выберите подходящую категорию'}
						</p>
						<div className={styles.list}>
							{isProductCategoriesLoading ? (
								<React.Fragment>
									{[...new Array(3)].map((_, index) => (
										<div
											className='w-full h-[100px] bg-gray-200 rounded-md animate-pulse'
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
												onDropdown={onSelectCategory}
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
														onDropdown={onSelectCategory}
													/>
												))}
											</ul>
										)
								)}
						</div>

						{isProductCategoriesSuccess && targetCategory && (
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
						)}
					</div>
				)}
			</div>
		</div>
	)
}
