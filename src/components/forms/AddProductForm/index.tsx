'use client'

import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { ChevronRight, X } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { createProductSchema } from '@/schemas'
import { AddProductImageInput, FormField, FormTextArea } from '@/components'

import type { CreateProductType } from '@/types/product.types'
import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './add-product-form.module.scss'

type ImageFileType = {
	binary: File
	blobUrl: string
}

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

	const [primaryImage, setPrimaryImage] = React.useState(0)
	const [images, setImages] = React.useState<ImageFileType[]>([])

	console.log('images:', images)

	const processFiles = (files: FileList) => {
		const fileArray = Array.from(files)
		const data: ImageFileType[] = fileArray.map((file, index) => ({
			binary: file,
			blobUrl: URL.createObjectURL(file)
		}))

		setImages(data)
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files

		if (files) processFiles(files)
	}

	const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		const files = event.dataTransfer.files

		if (files) processFiles(files)
	}

	const onDeleteImage = (index: number) => {
		setImages((prev) => prev.filter((_, i) => index !== i))
	}

	return (
		<div className={styles.container}>
			<div className={styles.breadcrumbs}>
				{categoryPath.map((item, index) => (
					<React.Fragment key={item.id}>
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
					<form className={styles.form}>
						<div className={styles.field}>
							<div className={styles.fieldHeading}>
								<h5 className={styles.fieldTitle}>Фотографии</h5>
								<p className={styles.fieldCaption}>
									{images.length > 0 ? `${images.length} из 5` : 'До 5 файлов'}
								</p>
							</div>
							<div className={styles.imageList}>
								{images.map((image, index) => (
									<div
										className={styles.imageContainer}
										key={image.blobUrl}
									>
										<div
											className={clsx(styles.imagePreview, {
												[styles.primary]: primaryImage === index
											})}
											onClick={() => setPrimaryImage(index)}
										>
											<Image
												className={styles.imageSource}
												src={image.blobUrl}
												width={150}
												height={115}
												alt={`Фотография ${index}`}
											/>
											<button
												className={styles.imageDeleteButton}
												type='button'
												onClick={() => onDeleteImage(index)}
											>
												<X className={styles.icon} />
											</button>
										</div>
										{primaryImage === index && (
											<span className={styles.imageCaption}>главное фото</span>
										)}
									</div>
								))}
								{images.length < 5 && (
									<AddProductImageInput
										multiple
										onChange={handleFileChange}
										onDrop={handleFileDrop}
									/>
								)}
							</div>
						</div>

						<div className={styles.field}>
							<div className={styles.fieldHeading}>
								<h5 className={styles.fieldTitle}>Название</h5>
							</div>
							<FormField
								name='name'
								variant='outlined'
								type='text'
								hint='Например, «Ноутбук Lenovo ThinkBook 16 Gen 6+ 32ГБ» или «Монитор LG UltraGear 27GN650-B»'
							/>
						</div>

						<div className={styles.field}>
							<div className={styles.fieldHeading}>
								<h5 className={styles.fieldTitle}>Описание</h5>
							</div>
							<FormTextArea
								name='description'
								variant='outlined'
								type='text'
								maxLength={7200}
								hint='Макс. количество символов — 7200'
							/>
						</div>

						<div className={styles.field}>
							<div className={styles.fieldHeading}>
								<h5 className={styles.fieldTitle}>Цена</h5>
							</div>
							<FormField
								name='price'
								variant='outlined'
								type='number'
								placeholder='₽'
							/>
						</div>

						<div className={styles.field}>
							<div className={styles.fieldHeading}>
								<h5 className={styles.fieldTitle}>Количество</h5>
							</div>
							<FormField
								name='count'
								variant='outlined'
								type='number'
								placeholder='шт'
								hint='Можно не указывать — тогда будет отображаться как «есть в наличии»'
							/>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
