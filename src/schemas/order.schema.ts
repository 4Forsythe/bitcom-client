import { z } from 'zod'

import { GettingType, PaymentType } from '@/types/order.types'

export const orderSchema = z.object({
	customerName: z.object({
		firstName: z
			.string({ message: 'Укажите имя' })
			.min(1, { message: 'Укажите имя' })
			.min(2, { message: 'Слишком короткое имя' })
			.max(50)
			.trim(),
		lastName: z
			.string({ message: 'Укажите фамилию' })
			.min(1, { message: 'Укажите фамилию' })
			.min(2, { message: 'Слишком короткая фамилия' })
			.max(50)
			.trim(),
		middleName: z.string().max(50).trim().optional()
	}),
	customerEmail: z
		.string({ message: 'Укажите контактный email' })
		.min(1, { message: 'Укажите контактный email' })
		.email({ message: 'Неверный формат эл. почты' }),
	customerPhone: z
		.string({ message: 'Укажите контактный номер' })
		.min(1, { message: 'Укажите контактный номер' })
		.min(17, { message: 'Неверный формат номера телефона' })
		.max(17, { message: 'Неверный формат номера телефона' }),

	paymentMethod: z.enum(Object.values(PaymentType) as [string, ...string[]]),
	gettingMethod: z.enum(Object.values(GettingType) as [string, ...string[]])
})
