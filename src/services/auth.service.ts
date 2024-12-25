import { api } from '@/api/interceptors/api-instance'

import type { UserType } from '@/types/user.types'
import type {
	AuthType,
	LoginFormType,
	RegisterFormType
} from '@/types/auth.types'

import { setAccessToken, removeAccessToken } from './auth-token.service'

class AuthService {
	private endpoint = '/auth'

	async login(data: LoginFormType) {
		const response = await api.post<AuthType>(`${this.endpoint}/login`, data)
		const token = response.data.accessToken

		if (token) setAccessToken(token)

		return response
	}

	async register(data: RegisterFormType) {
		const response = await api.post<AuthType>(`${this.endpoint}/register`, data)
		const token = response.data.accessToken

		if (token) setAccessToken(token)

		return response
	}

	async sendCode(data: { email: string }) {
		const response = await api.post<boolean>(
			`${this.endpoint}/send-code?email=${data.email}`
		)

		return response
	}

	async verify(data: { userId: string; code: string }) {
		const response = await api.get<UserType>(
			`${this.endpoint}/verify?userId=${data.userId}&code=${data.code}`
		)

		return response
	}

	async getTokens() {
		const response = await api.post<AuthType>(`${this.endpoint}/login/extend`)
		const token = response.data.accessToken

		if (token) setAccessToken(token)

		return response
	}

	async logout() {
		const response = await api.post<boolean>(`${this.endpoint}/logout`)

		if (response.data) removeAccessToken()

		return response
	}
}

export const authService = new AuthService()
