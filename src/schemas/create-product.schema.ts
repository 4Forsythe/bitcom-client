import { z } from 'zod'

export const createProductSchema = z.object({
	name: z.string({ message: 'Укажите названия для товара' }),
	description: z.string().optional(),
	price: z.string({ message: 'Укажите цену за ед. товара' }),
	count: z.string().optional(),
	sku: z.string().optional(),
	isArchived: z.boolean().optional(),
	isPublished: z.boolean().optional(),
	categoryId: z.string({ message: 'Не найдена категория для товара' })
})
