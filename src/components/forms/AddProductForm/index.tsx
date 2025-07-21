'use client'

import React from 'react'
import { ChevronRight } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { createProductSchema } from '@/schemas'
import { FormField, FormTextArea } from '@/components/ui'

import type { CreateProductType } from '@/types/product.types'
import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './add-product-form.module.scss'

interface Props {
	category: ProductCategoryType
	categoryPath: ProductCategoryType[]
	onBackToCategory: (category: ProductCategoryType, nesting: number) => void
}

export const AddProductForm: React.FC<Props> = ({
	category,
	categoryPath,
	onBackToCategory
}) => {
	const methods = useForm<CreateProductType>({
		mode: 'onChange',
		resolver: zodResolver(createProductSchema),
		defaultValues: {
			name: '',
			description: '',
			price: undefined,
			count: undefined,
			categoryId: category.id
		}
	})

	return (
		<div className={styles.container}>
			<div className={styles.breadcrumbs}>
				{categoryPath.map((item, index) => (
					<React.Fragment>
						{item.parentId && <ChevronRight size={16} />}
						<button
							className={styles.breadcrumbItem}
							key={item.id}
							onClick={() => onBackToCategory(item, index + 1)}
						>
							{item.name}
						</button>
					</React.Fragment>
				))}
			</div>
			<div className={styles.inner}>
				<FormProvider {...methods}>
					<form>
						<div className={styles.field}>
							<span className={styles.fieldHeading}>Название</span>
							<FormField
								name='name'
								className={styles.input}
								type='text'
							/>
						</div>

						<div className={styles.field}>
							<span className={styles.fieldHeading}>Описание</span>
							<FormTextArea
								name='description'
								className={styles.input}
								type='text'
							/>
						</div>

						<div className={styles.field}>
							<span className={styles.fieldHeading}>Цена</span>
							<FormField
								name='name'
								className={styles.input}
								type='text'
								placeholder='₽'
							/>
						</div>

						<div className={styles.field}>
							<span className={styles.fieldHeading}>Количество</span>
							<FormField
								name='name'
								className={styles.input}
								type='text'
								placeholder='шт'
							/>
							<p className={styles.fieldCaption}>Можно не указывать</p>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
