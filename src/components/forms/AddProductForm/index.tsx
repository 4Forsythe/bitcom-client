'use client'

import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronRight, X } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { createProductSchema } from '@/schemas'
import {
	AddProductImageInput,
	Button,
	FormField,
	FormTextArea,
	InfoBlock,
	ProductEditingAlert,
	SwitchButton
} from '@/components'
import { useUploadImages } from '@/hooks/useUploadImages'
import { useCreateProduct } from '@/hooks/useCreateProduct'
import { useUpdateProduct } from '@/hooks/useUpdateProduct'
import { isImageFileAllowed } from '@/utils/is-image-file-allowed'

import type { ProductCategoryType } from '@/types/product-category.types'
import type {
	ProductType,
	ProductFormType,
	CreateProductType
} from '@/types/product.types'

import styles from './add-product-form.module.scss'

type ImageFileType = {
	id?: string
	file?: File
	url: string
}

interface Props {
	product?: ProductType
	category: ProductCategoryType
	categoryPath: ProductCategoryType[]
	onBackToCategory: (category: ProductCategoryType, nesting: number) => void
}

const MAX_IMAGES_LIMIT = 5

export const AddProductForm: React.FC<Props> = ({
	product,
	category,
	categoryPath,
	onBackToCategory
}) => {
	const router = useRouter()
	const methods = useForm<ProductFormType>({
		mode: 'onChange',
		resolver: zodResolver(createProductSchema),
		defaultValues: {
			name: product?.name || '',
			description: product?.description || '',
			price: product?.price || undefined,
			discountPrice: product?.discountPrice || undefined,
			count:
				typeof product?.count === 'number' ? String(product.count) : undefined,
			sku: product ? product.sku.join(', ') : '',
			isArchived: product?.isArchived || false,
			categoryId: category.id
		}
	})

	const isArchived = methods.watch('isArchived')

	const [submitActionType, setSubmitActionType] = React.useState<
		'save' | 'publish'
	>('save')
	const [images, setImages] = React.useState<ImageFileType[]>([])
	const [primaryImage, setPrimaryImage] = React.useState<string | undefined>(
		product && product.images.length > 0
			? product.images.find((image) => Math.min(image.sortOrder))?.url
			: undefined
	)

	const { createProductAsync, isCreateProductPending, isCreateProductError } =
		useCreateProduct()
	const { updateProductAsync, isUpdateProductPending, isUpdateProductError } =
		useUpdateProduct()
	const { uploadImagesAsync, isUploadImagesPending, isUploadImagesError } =
		useUploadImages()

	React.useEffect(() => {
		if (product) {
			setImages(
				product.images.map((image) => ({
					id: image.id,
					url: `${SERVER_BASE_URL}/${image.url}`
				}))
			)
		}
	}, [product])

	React.useEffect(() => {
		if (!images.length) {
			setPrimaryImage(undefined)
			return
		}

		const isValid = images.some((image) => image.url === primaryImage)

		if (!isValid) {
			setPrimaryImage(images[0].url)
		}
	}, [images, primaryImage])

	React.useEffect(() => {
		if (isCreateProductError || isUpdateProductError || isUploadImagesError) {
			window.scrollTo(0, 0)
		}
	}, [isCreateProductError, isUpdateProductError, isUploadImagesError])

	const processFiles = (files: FileList) => {
		const fileArray = Array.from(files)
		const filtered = fileArray.filter((file) => isImageFileAllowed(file))

		const data: ImageFileType[] = filtered.map((file) => ({
			file: file,
			url: URL.createObjectURL(file)
		}))

		setImages((prev) => [...prev, ...data].slice(0, MAX_IMAGES_LIMIT))
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
		setImages((prev) => prev.filter((_, i) => i !== index))
	}

	const onChangePrimaryImage = (images: ImageFileType[]) => {
		const copy = [...images]
		const index = copy.findIndex((image) => image.url === primaryImage)
		const [item] = copy.splice(index, 1)
		copy.unshift(item)
		return copy
	}

	const onSubmit = async (data: ProductFormType) => {
		const dto: CreateProductType = {
			name: data.name,
			description: data.description,
			price: +data.price,
			discountPrice: data.discountPrice ? +data.discountPrice : undefined,
			count: data.count ? +data.count : undefined,
			sku: data.sku
				? data.sku.split(',').map((char) => char.trim())
				: undefined,
			isArchived: data.isArchived,
			isPublished: submitActionType === 'publish',
			categoryId: data.categoryId
		}

		let item = product

		if (!product) {
			const createdProduct = await createProductAsync(dto)
			item = createdProduct
		}

		if (product) {
			const updatedProduct = await updateProductAsync({ id: product.id, dto })
			item = updatedProduct
		}

		const previews = images.length > 1 ? onChangePrimaryImage(images) : images

		const isNewFiles = images.some((image) => !!image.file)

		if (item) {
			await uploadImagesAsync({
				id: item.id,
				dto: {
					images: isNewFiles
						? previews.reduce(
								(acc, image, index) => {
									if (image.file) {
										acc.push({
											file: image.file as File,
											order: index
										})
									}
									return acc
								},
								[] as { file: File; order: number }[]
							)
						: [],
					preserved:
						images.length > 0
							? previews.reduce(
									(acc, image, index) => {
										if (!image.file) {
											acc.push({
												id: image.id as string,
												sortOrder: index
											})
										}
										return acc
									},
									[] as { id: string; sortOrder: number }[]
								)
							: []
				}
			})
		}

		router.push(
			item ? `${ROUTE.PRODUCT}/${item.slug}` : `${ROUTE.CATALOG}/${category.id}`
		)
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
			{product && (
				<div className={styles.alert}>
					<ProductEditingAlert product={product} />
				</div>
			)}
			<div className={styles.inner}>
				<FormProvider {...methods}>
					<form
						className={styles.form}
						onSubmit={methods.handleSubmit(onSubmit)}
					>
						{(isCreateProductError ||
							isUpdateProductError ||
							isUploadImagesError) && (
							<InfoBlock variant='dangerous'>
								К сожалению, возникла непредвиденная ошибка при отправке формы
							</InfoBlock>
						)}
						<div className={styles.block}>
							<h4 className={styles.title}>Основные параметры</h4>
							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Фотографии</h5>
									<p className={styles.fieldCaption}>
										{images.length > 0
											? `${images.length} из ${MAX_IMAGES_LIMIT}`
											: 'До 5 файлов'}
									</p>
								</div>
								<div className={styles.imageList}>
									{images.length < 5 && (
										<AddProductImageInput
											onChange={handleFileChange}
											onDrop={handleFileDrop}
											multiple
										/>
									)}
									{images.map((image, index) => (
										<div
											className={styles.imageContainer}
											key={image.url}
										>
											<div
												className={clsx(styles.imagePreview, {
													[styles.primary]:
														primaryImage === image.url ||
														(product?.images &&
															image.id &&
															primaryImage === product.images[index].url)
												})}
											>
												<Image
													className={styles.imageSource}
													src={image.url}
													width={150}
													height={115}
													alt={`Фотография ${index}`}
													onClick={() => setPrimaryImage(image.url)}
												/>
												<button
													className={styles.imageDeleteButton}
													type='button'
													onClick={() => onDeleteImage(index)}
												>
													<X className={styles.icon} />
												</button>
											</div>
											{primaryImage === image.url && (
												<span className={styles.imageCaption}>
													главное фото
												</span>
											)}
										</div>
									))}
								</div>
								<span className={styles.fieldDescription}>
									Поддерживаемый формат: JPG, JPEG, PNG и WEBP
								</span>
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
									<h5 className={styles.fieldTitle}>Цена розничная</h5>
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
									<h5 className={styles.fieldTitle}>Цена после скидки</h5>
								</div>
								<FormField
									name='discountPrice'
									variant='outlined'
									type='number'
									placeholder='₽'
									hint='Можно не указывать — тогда в карточке товара будет отображаться розничная цена'
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
									disabled={isArchived}
								/>
							</div>
						</div>

						<div className={styles.block}>
							<h4 className={styles.title}>Дополнительно</h4>
							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Штрихкоды</h5>
									<p className={styles.fieldCaption}>
										Вы можете указать действующие уникальные штрихкоды товара
										через запятую — это поможет вам в поиске и подготовке заказа
										на выдачу
									</p>
								</div>
								<FormField
									name='sku'
									variant='outlined'
									type='text'
									hint='Можно не указывать'
								/>
							</div>
							{product?.isPublished && (
								<div className={styles.field}>
									<div className={styles.fieldHeading}>
										<h5 className={styles.fieldTitle}>Архивация</h5>
									</div>
									<SwitchButton
										name='isArchived'
										label='Обнулить остатки и поместить в архив'
									/>
									<span className={styles.fieldDescription}>
										После архивации товар все еще может отображаться некоторым
										пользователям
									</span>
								</div>
							)}
						</div>

						<div className={styles.buttons}>
							<Button
								type='submit'
								onClick={() => setSubmitActionType('publish')}
								isLoading={
									isCreateProductPending ||
									isUpdateProductPending ||
									isUploadImagesPending
								}
							>
								{product && product.isPublished
									? 'Обновить изменения'
									: 'Опубликовать сейчас'}
							</Button>
							<Button
								variant='outlined'
								type='submit'
								onClick={() => setSubmitActionType('save')}
								isLoading={
									isCreateProductPending ||
									isUpdateProductPending ||
									isUploadImagesPending
								}
							>
								{product && product.isPublished
									? 'Скрыть с витрины'
									: 'Сохранить черновик'}
							</Button>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
