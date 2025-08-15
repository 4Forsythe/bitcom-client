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
		value: z.coerce
			.number()
			.int({ message: 'Значение должно быть целым числом' })
			.min(0, { message: 'Значение не может быть нулевым' }),
		products: z.array(z.string()).default([]),
		categoryId: z.string().optional(),
		isExpired: z.boolean().optional(),
		startedAt: z.date({
			required_error: 'Укажите дату старта акции',
			invalid_type_error: 'Введена некорректная дата'
		}),
		expiresAt: z.date({
			required_error: 'Укажите дату окончания акции',
			invalid_type_error: 'Введена некорректная дата'
		})
	})
	.refine((data) => data.type === 'percentage' && data.value < 100, {
		message: 'Процентное соотношение скидки не может быть больше 99%',
		path: ['value']
	})
	.refine((data) => data.startedAt < data.expiresAt, {
		message: 'Дата завершения должна наступать позже даты начала',
		path: ['expiresAt']
	})
