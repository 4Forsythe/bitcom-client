import { z } from 'zod'

import { loginSchema, registerSchema, verifySchema } from '@/schemas'

import type { UserType } from './user.types'

export type AuthType = {
	user: UserType
	accessToken: string
}

export type LoginFormType = z.infer<typeof loginSchema>
export type RegisterFormType = z.infer<typeof registerSchema>
export type VerifyFormType = z.infer<typeof verifySchema>
