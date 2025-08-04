import { z } from 'zod'

export const createProductSchema = z
	.object({
		name: z
			.string({ message: 'Укажите название для товара' })
			.trim()
			.min(1, { message: 'Укажите название для товара' }),
		description: z.string().optional(),
		price: z
			.string({ message: 'Укажите цену за ед. товара' })
			.min(1, { message: 'Укажите цену за ед. товара' }),
		discountPrice: z.string().optional(),
		count: z.string().optional(),
		sku: z.string().optional(),
		guarantee: z.string().optional(),
		isArchived: z.boolean().optional(),
		isPublished: z.boolean().optional(),
		categoryId: z.string({ message: 'Не найдена категория для товара' })
	})
	.refine(
		(data) => {
			if (!data.discountPrice) return true
			return Number(data.discountPrice) < Number(data.price)
		},
		{
			message: 'Цена после скидки должна быть меньше розничной цены',
			path: ['discountPrice']
		}
	)
	.refine(
		(data) => {
			if (data.isArchived) return true
			return !data.count || Number(data.count) !== 0
		},
		{
			message: 'Неархивированные товары не могут иметь нулевой остаток',
			path: ['count']
		}
	)
