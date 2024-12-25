import { z } from 'zod'

import { GettingType, PaymentType } from '@/types/order.types'

export const orderSchema = z.object({
	customerName: z
		.string({ message: 'Заполните поле' })
		.min(5, { message: 'Введите полное ФИО' })
		.max(144, { message: 'Слишком длинное ФИО' }),
	customerEmail: z
		.string({ message: 'Заполните поле' })
		.email({ message: 'Неверный формат для email' }),
	customerPhone: z
		.string({ message: 'Заполните поле' })
		.min(17, { message: 'Неверный формат номера телефона' })
		.max(17, { message: 'Неверный формат номера телефона' }),

	paymentMethod: z.enum(Object.values(PaymentType) as [string, ...string[]]),
	gettingMethod: z.enum(Object.values(GettingType) as [string, ...string[]])
})
