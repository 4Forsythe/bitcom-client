import { z } from 'zod'

export const serviceCenterFormSchema = z.object({
	name: z
		.string({ message: 'Укажите имя' })
		.min(1, { message: 'Укажите имя' })
		.min(2, { message: 'Слишком короткое имя' })
		.max(50)
		.trim(),
	email: z
		.string({ message: 'Укажите контактный email' })
		.min(1, { message: 'Укажите контактный email' })
		.email({ message: 'Неверный формат эл. почты' }),
	phone: z
		.string({ message: 'Укажите контактный номер' })
		.min(1, { message: 'Укажите контактный номер' })
		.min(17, { message: 'Неверный формат номера телефона' })
		.max(17, { message: 'Неверный формат номера телефона' }),
	request: z
		.string({ message: 'Опишите свою проблему' })
		.min(32, { message: 'Опишите проблему более конкретно' })
		.max(720, { message: 'Слишком длинное описание проблемы' })
		.trim(),
	comment: z
		.string()
		.max(5200, { message: 'Слишком длинный текст комментария' })
		.trim()
		.optional()
})
