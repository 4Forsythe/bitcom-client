'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { ROUTE } from '@/config/routes.config'
import { SERVER_BASE_URL } from '@/constants'
import { createProductSchema } from '@/schemas'
import {
	AddProductImageInput,
	Button,
	DayPicker,
	FormDayPicker,
	FormField,
	FormTextArea,
	InfoBlock,
	ProductEditingAlert,
	Select,
	SwitchButton
} from '@/components'
import { useUploadImages } from '@/hooks/useUploadImages'
import { useCreateProduct } from '@/hooks/useCreateProduct'
import { useUpdateProduct } from '@/hooks/useUpdateProduct'
import { isImageFileAllowed } from '@/utils/is-image-file-allowed'
import { downscaleImage } from '@/utils/downscale-Image'

import type { ProductCategoryType } from '@/types/product-category.types'
import type {
	ProductType,
	ProductFormType,
	CreateProductType
} from '@/types/product.types'

import styles from './add-discount-form.module.scss'
import { DiscountFormType } from '@/types/discount.types'
import { createDiscountSchema } from '@/schemas/create-discount.schema'
import type { SelectItemType } from '@/components/ui/Select'

const DISCOUNT_TYPES: SelectItemType[] = [
	{
		id: 'percentage',
		title: 'Скидка в процентах',
		node: 'Скидка в процентах'
	}
]

interface Props {}

export const AddDiscountForm: React.FC<Props> = ({}) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const today = new Date()
	const expiresAt = new Date(today)

	expiresAt.setDate(expiresAt.getDate() + 7)

	const methods = useForm<DiscountFormType>({
		mode: 'onChange',
		resolver: zodResolver(createDiscountSchema),
		defaultValues: {
			name: '',
			type: 'percentage',
			value: undefined,
			products: [],
			categoryId: '',
			isExpired: false,
			startedAt: today,
			expiresAt: expiresAt
		}
	})

	const isExpired = methods.watch('isExpired')

	const [submitActionType, setSubmitActionType] = React.useState<
		'save' | 'publish'
	>('save')

	React.useEffect(() => {
		methods.reset({
			name: '',
			type: 'percentage',
			value: undefined,
			products: [],
			categoryId: '',
			isExpired: false,
			startedAt: today,
			expiresAt: expiresAt
		})
	}, [router, searchParams])

	// React.useEffect(() => {
	// 	if (isCreateProductError || isUpdateProductError || isUploadImagesError) {
	// 		window.scrollTo(0, 0)
	// 	}
	// }, [isCreateProductError, isUpdateProductError, isUploadImagesError])

	const onSubmit = async (data: DiscountFormType) => {
		console.log('data', data)
	}

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<FormProvider {...methods}>
					<form
						className={styles.form}
						onSubmit={methods.handleSubmit(onSubmit)}
					>
						{/* {(isCreateProductError ||
							isUpdateProductError ||
							isUploadImagesError) && (
							<InfoBlock variant='dangerous'>
								К сожалению, возникла ошибка на стороне сервера
							</InfoBlock>
						)} */}
						<div className={styles.block}>
							<h4 className={styles.title}>Основные параметры</h4>
							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Заголовок</h5>
								</div>
								<FormField
									name='name'
									variant='outlined'
									type='text'
									hint='Например, «Скидка 20%! Ноутбуки Lenovo» или «Выгодные цены! Мониторы LG Flatron»'
								/>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Тип акции</h5>
								</div>
								<Controller
									name='type'
									control={methods.control}
									render={({ field }) => (
										<Select
											items={DISCOUNT_TYPES}
											selected={DISCOUNT_TYPES[0]}
											placeholder='Выберите тип акции'
											onSelect={(id) =>
												field.onChange(
													DISCOUNT_TYPES.find((item) => item.id === id)
												)
											}
										/>
									)}
								/>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Скидка в процентах</h5>
								</div>
								<FormField
									name='value'
									variant='outlined'
									type='number'
									placeholder='%'
								/>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Начало действия</h5>
								</div>
								<FormDayPicker
									name='startedAt'
									disabledDayBefore
								/>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Завершение действия</h5>
								</div>
								<FormDayPicker
									name='expiresAt'
									hint='После создания акции у вас останется возможность завершить ее досрочно'
									disabledDayBefore
								/>
							</div>
						</div>

						<div className={styles.block}>
							<h4 className={styles.title}>Дополнительно</h4>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Досрочное завершение</h5>
								</div>
								<SwitchButton
									name='isArchived'
									label='Завершить акцию и отменить скидки на товары'
								/>
								<span className={styles.fieldDescription}>
									После завершения акции всем товарам вернутся изначальные цены,
									включая скидочные
								</span>
							</div>
						</div>

						{/* <div className={styles.buttons}>
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
						</div> */}
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
