import { z } from 'zod'

import { loginSchema } from './login.schema'
import { passwordSchema } from './password.schema'

export const registerSchema = loginSchema
	.merge(
		z.object({
			name: z
				.string()
				.min(2, { message: 'Слишком короткое имя' })
				.optional()
				.or(z.literal('')),
			confirmPassword: passwordSchema
		})
	)
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})
