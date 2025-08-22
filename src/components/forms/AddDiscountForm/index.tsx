'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Controller, FormProvider, get, useForm } from 'react-hook-form'

import {
	Button,
	FormDayPicker,
	FormField,
	InfoBlock,
	ProductCategorySelect,
	ProductSelect,
	Select,
	SwitchButton
} from '@/components'

import { calcNounDeclension } from '@/utils/calc-noun-declension'
import { createDiscountSchema } from '@/schemas/create-discount.schema'

import { useCreateDiscount } from '@/hooks/useCreateDiscount'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import { useProductCategories } from '@/hooks/useProductCategories'

import {
	type DiscountFormType,
	type CreateDiscountType,
	DiscountTypeVariables
} from '@/types/discount.types'
import type { SelectItemType } from '@/components/ui/Select'

import styles from './add-discount-form.module.scss'

const DISCOUNT_TYPES: SelectItemType[] = [
	{
		id: DiscountTypeVariables.PERCENT,
		title: '(%) Процентная скидка',
		node: '(%) Процентная скидка'
	},
	{
		id: DiscountTypeVariables.FIXED,
		title: '(₽) Фиксированная скидка',
		node: '(₽) Фиксированная скидка',
		disabled: true
	}
]

interface Props {}

export const AddDiscountForm: React.FC<Props> = ({}) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const today = new Date()
	const expiresAt = new Date(today)

	const {
		productCategories,
		isProductCategoriesLoading,
		isProductCategoriesError
	} = useProductCategories(undefined, { flat: true })

	const {
		products,
		isProductsLoading,
		isProductsError,
		isProductsFetching,
		intersectionRef,
		refetch
	} = useInfiniteProducts()

	const {
		createDiscountAsync,
		isCreateDiscountPending,
		isCreateDiscountError
	} = useCreateDiscount()

	expiresAt.setDate(expiresAt.getDate() + 7)

	const methods = useForm<DiscountFormType>({
		mode: 'onChange',
		resolver: zodResolver(createDiscountSchema),
		defaultValues: {
			name: '',
			type: DiscountTypeVariables.PERCENT,
			amount: undefined,
			priority: undefined,
			products: [],
			categoryId: null,
			isArchived: false,
			startedAt: today,
			expiresAt: expiresAt
		}
	})

	const categoryFieldError = get(methods.formState.errors, 'categoryId')
	const productsFieldError = get(methods.formState.errors, 'products')

	const startedAt = methods.watch('startedAt')
	const categoryId = methods.watch('categoryId')
	const selectedProducts = methods.watch('products')

	const [submitActionType, setSubmitActionType] = React.useState<
		'save' | 'publish'
	>('save')

	React.useEffect(() => {
		methods.reset({
			name: '',
			type: DiscountTypeVariables.PERCENT,
			amount: undefined,
			priority: undefined,
			products: [],
			categoryId: null,
			isArchived: false,
			startedAt: today,
			expiresAt: expiresAt
		})
	}, [router, searchParams])

	React.useEffect(() => {
		if (isCreateDiscountError) {
			window.scrollTo(0, 0)
		}
	}, [isCreateDiscountError])

	const onSubmit = async (data: DiscountFormType) => {
		const getMidnight = (date: Date) => {
			const today = new Date()
			const day = date.getDate()
			const month = date.getMonth()
			const fullYear = date.getFullYear()

			if (date > today) {
				return new Date(Date.UTC(fullYear, month, day, 0 - 3, 0, 0))
			}

			return date
		}

		const dto: CreateDiscountType = {
			name: data.name,
			type: data.type,
			amount: data.amount,
			priority: Number(data.priority),
			products: data.products,
			categoryId: data.categoryId || null,
			isArchived: submitActionType === 'publish' ? false : data.isArchived,
			startedAt: getMidnight(data.startedAt).toISOString(),
			expiresAt: getMidnight(data.expiresAt).toISOString()
		}

		await createDiscountAsync(dto)
	}

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<FormProvider {...methods}>
					<form
						className={styles.form}
						onSubmit={methods.handleSubmit(onSubmit)}
					>
						{isCreateDiscountError && (
							<InfoBlock variant='dangerous'>
								К сожалению, возникла ошибка на стороне сервера
							</InfoBlock>
						)}
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
									hint='Например, «Скидка на все ноутбуки Lenovo!» или «Летняя распродажа! Мониторы LG Flatron»'
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
											selected={
												DISCOUNT_TYPES.find(
													(item) => item.id === field.value
												) || DISCOUNT_TYPES[0]
											}
											placeholder='Выберите тип акции'
											onSelect={(id) => {
												const match = DISCOUNT_TYPES.find(
													(item) => item.id === id
												)
												return match
													? field.onChange(match.id)
													: field.onChange(DISCOUNT_TYPES[0].id)
											}}
										/>
									)}
								/>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Скидка в процентах</h5>
								</div>
								<FormField
									name='amount'
									variant='outlined'
									type='number'
									placeholder='%'
									maxLength={2}
								/>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Начало действия</h5>
								</div>
								<FormDayPicker
									name='startedAt'
									hint={
										startedAt > new Date()
											? 'Акция начнется в 0:00 по МСК'
											: 'Акция начнется прямо сейчас'
									}
									required
									disabledDayBefore
								/>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Завершение действия</h5>
								</div>
								<FormDayPicker
									name='expiresAt'
									hint='Акция завершится автоматически в 0:00 по МСК того же дня'
									required
									disabledDayBefore
								/>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Приоритет скидки</h5>
								</div>
								<FormField
									name='priority'
									variant='outlined'
									type='number'
									placeholder='от 0 до 9'
									maxLength={1}
								/>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>Цель акции — категория</h5>
									<p className={styles.fieldCaption}>
										{selectedProducts.length > 0
											? `Вы уже выбрали ${selectedProducts.length > 1 ? 'товары' : 'товар'} под акцию`
											: categoryId
												? `Вы выбрали категорию — ${productCategories?.items.find((item) => item.id === categoryId)?.name}`
												: 'Можно выбрать только одно из двух: категория или список товаров'}
									</p>
								</div>
								<div className={styles.fieldInner}>
									<Controller
										name='categoryId'
										control={methods.control}
										render={({ field }) => (
											<ProductCategorySelect
												items={productCategories?.items || []}
												selectedItem={field.value}
												onSelect={(item) =>
													field.onChange(item ? item.id : null)
												}
												isLoading={isProductCategoriesLoading}
												error={
													!selectedProducts.length && categoryFieldError
														? (categoryFieldError.message as string)
														: undefined
												}
											/>
										)}
									/>
									{selectedProducts.length > 0 && (
										<div className={styles.overlay} />
									)}
								</div>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldHeading}>
									<h5 className={styles.fieldTitle}>
										Цель акции — список товаров
									</h5>
									<p className={styles.fieldCaption}>
										{categoryId
											? 'Вы уже выбрали категорию для акции'
											: selectedProducts.length > 0
												? `Вы выбрали ${calcNounDeclension(selectedProducts.length, 'товар', 'товара', 'товаров')}`
												: 'Можно выбрать только одно из двух: категория или список товаров'}
									</p>
								</div>
								<div className={styles.fieldInner}>
									<Controller
										name='products'
										control={methods.control}
										render={({ field }) => (
											<ProductSelect
												ref={intersectionRef}
												items={products?.pages || []}
												selectedItems={field.value}
												onSelect={(item) => {
													const isExists = field.value.find(
														(i) => i === item.id
													)
													return isExists
														? field.onChange(
																field.value.filter((i) => i !== item.id)
															)
														: field.onChange([...(field.value ?? []), item.id])
												}}
												onFetch={(query) => refetch(query)}
												isLoading={isProductsLoading}
												isFetching={isProductsFetching}
												error={
													!categoryId && productsFieldError
														? (productsFieldError.message as string)
														: undefined
												}
											/>
										)}
									/>
									{categoryId && <div className={styles.overlay} />}
								</div>
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

						<div className={styles.buttons}>
							<Button
								type='submit'
								onClick={() => setSubmitActionType('publish')}
								isLoading={isCreateDiscountPending}
							>
								Запланировать акцию
							</Button>
							<Button
								variant='outlined'
								type='submit'
								onClick={() => setSubmitActionType('save')}
								isLoading={isCreateDiscountPending}
							>
								Сохранить черновик
							</Button>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
