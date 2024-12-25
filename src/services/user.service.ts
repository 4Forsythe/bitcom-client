import { api, apiWithHeaders } from '@/api/interceptors/api-instance'

import type { UserType, UserFormType } from '@/types/user.types'

class UserService {
	private endpoint = '/user'

	async getProfile(token?: string) {
		if (token) {
			const headers = { Authorization: `Bearer ${token}` }

			const response = await api.get<UserType>(`${this.endpoint}/me`, {
				headers
			})

			return response.data
		} else {
			const response = await apiWithHeaders.get<UserType>(`${this.endpoint}/me`)

			return response.data
		}
	}

	async getByEmail(params: { email: string }) {
		const response = await api.get<UserType>(this.endpoint, {
			params
		})

		return response.data
	}

	async update(data: UserFormType) {
		const response = await apiWithHeaders.patch<UserType>(
			`${this.endpoint}/me`,
			data
		)

		return response.data
	}
}

export const userService = new UserService()
