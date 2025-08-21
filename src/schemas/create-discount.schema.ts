import { z } from 'zod'

import { discountTypes } from '@/types/discount.types'

export const createDiscountSchema = z
	.object({
		name: z
			.string({ message: 'Укажите заголовок для акции' })
			.trim()
			.min(1, { message: 'Укажите заголовок для акции' })
			.max(250, { message: 'Слишком длинный заголовок' }),
		type: z.enum(discountTypes, { message: 'Укажите тип акции' }),
		amount: z.coerce
			.number()
			.int({ message: 'Значение должно быть целым числом' })
			.min(0, { message: 'Значение не может быть нулевым' }),
		priority: z.preprocess(
			(value) => {
				value === '' || value === undefined || value === null
					? undefined
					: Number(value)
			},
			z
				.number({ message: 'Укажите приоритет' })
				.int({ message: 'Значение должно быть целым числом' })
				.max(10, { message: 'Значение не может быть больше 9' })
		),
		products: z.array(z.string()).default([]),
		categoryId: z.string().nullable().optional(),
		isArchived: z.boolean().optional(),
		startedAt: z.date({
			required_error: 'Укажите дату старта акции',
			invalid_type_error: 'Укажите дату старта акции'
		}),
		expiresAt: z.date({
			required_error: 'Укажите дату окончания акции',
			invalid_type_error: 'Укажите дату старта акции'
		})
	})
	.refine(
		(data) =>
			data.type === 'percentage' && data.amount < 100 && data.amount > 0,
		{
			message: 'Процентная скидка должна быть в диапазоне от 0% до 99%',
			path: ['amount']
		}
	)
	.refine((data) => data.priority >= 0 && data.priority <= 9, {
		message: 'Приоритет должен быть числом от 0 до 9 включительно',
		path: ['priority']
	})
	.superRefine((data, ctx) => {
		if (data.startedAt > data.expiresAt) {
			ctx.addIssue({
				code: 'custom',
				message: 'Дата начала должна быть раньше даты завершения',
				path: ['startedAt']
			})
			ctx.addIssue({
				code: 'custom',
				message: 'Дата завершения должна быть позже даты начала',
				path: ['expiresAt']
			})
		}
	})
	.superRefine((data, ctx) => {
		if (!data.categoryId && !data.products.length) {
			ctx.addIssue({
				code: 'custom',
				message: 'Выберите цель акции — категорию или товары',
				path: ['categoryId']
			})
			ctx.addIssue({
				code: 'custom',
				message: 'Выберите цель акции — категорию или товары',
				path: ['products']
			})
		}
	})
