import { z } from 'zod'

export const passwordSchema = z
	.string()
	.min(5, { message: 'Слишком короткий пароль' })
