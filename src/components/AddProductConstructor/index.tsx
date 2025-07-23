'use client'

import React from 'react'

import { Button, Heading, AddProductForm } from '@/components'
import { AddProductCategoryItem } from './add-product-category-item'

import { getRootCategoryPath } from '@/utils/get-root-category-path'
import { getFullCategoryPath } from '@/utils/get-full-category-path'

import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './add-product.module.scss'

const categories: ProductCategoryType[] = [
	{
		id: '1',
		name: 'Категория 1',
		imageUrl: undefined,
		parentId: undefined,
		children: [
			{
				id: '11',
				name: 'Подкатегория 1',
				imageUrl: undefined,
				parentId: '1',
				children: [
					{
						id: '111',
						name: 'Подкатегория 1 1',
						imageUrl: undefined,
						parentId: '11',
						children: []
					}
				]
			},
			{
				id: '12',
				name: 'Подкатегория 2',
				imageUrl: undefined,
				parentId: '1',
				children: []
			}
		]
	},
	{
		id: '2',
		name: 'Категория 2',
		imageUrl: undefined,
		parentId: undefined,
		children: []
	},
	{
		id: '3',
		name: 'Категория 3',
		imageUrl: undefined,
		parentId: undefined,
		children: [
			{
				id: '31',
				name: 'Подкатегория 3',
				imageUrl: undefined,
				parentId: '3',
				children: []
			}
		]
	}
]

export const AddProductConstructor: React.FC = () => {
	const [targetCategory, setTargetCategory] =
		React.useState<ProductCategoryType>()
	const [isShowForm, setIsShowForm] = React.useState(false)
	const [categoryPath, setCategoryPath] = React.useState<string[]>([])
	const [nestedItems, setNestedItems] = React.useState<ProductCategoryType[][]>(
		[]
	)

	console.log('Target category:', targetCategory)

	const onSelectCategory = (item: ProductCategoryType, nesting: number) => {
		setTargetCategory(item)
		setNestedItems([...nestedItems.slice(0, nesting), item.children])
		setCategoryPath(getRootCategoryPath(categories, item))
	}

	const handleBackToCategory = (
		category: ProductCategoryType,
		nesting: number
	) => {
		setIsShowForm(false)
		setTargetCategory(category)
		setNestedItems((prev) => prev.slice(0, nesting))
		setCategoryPath(getRootCategoryPath(categories, category))
	}

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<Heading
					title='Добавить новый товар'
					control
				/>
				{targetCategory && isShowForm ? (
					<AddProductForm
						category={targetCategory}
						categoryPath={getFullCategoryPath(categories, targetCategory)}
						onBackToCategory={handleBackToCategory}
					/>
				) : (
					<div className={styles.block}>
						<p className={styles.caption}>Выберите подходящую категорию</p>
						<div className={styles.list}>
							<ul className={styles.categories}>
								{categories.map((item) => (
									<AddProductCategoryItem
										key={item.id}
										item={item}
										nesting={0}
										isSelected={categoryPath.includes(item.id)}
										onDropdown={onSelectCategory}
									/>
								))}
							</ul>

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
														isSelected={categoryPath.includes(item.id)}
														onDropdown={onSelectCategory}
													/>
												))}
											</ul>
										)
								)}
						</div>

						{targetCategory && (
							<div className={styles.confirm}>
								<p className={styles.confirmText}>
									{`Выбрать категорию "${targetCategory.name}"?`}
								</p>
								<Button
									className={styles.confirmButton}
									onClick={() => setIsShowForm(true)}
								>
									Да, подтвердить
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
