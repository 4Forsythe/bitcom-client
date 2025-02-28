import axios, { type CreateAxiosDefaults } from 'axios'

import {
	getAccessToken,
	removeAccessToken
} from '@/services/auth-token.service'
import { catchErrorMessage } from '@/api/catch-error-message'
import { authService } from '@/services/auth.service'

const isServerFetch = typeof window === 'undefined'

const API_BASE_URL = process.env.API_BASE_URL
const API_REWRITE_URL = process.env.NEXT_PUBLIC_API_GLOBAL_PREFIX
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL

const options: CreateAxiosDefaults = {
	baseURL: isServerFetch ? API_BASE_URL : API_REWRITE_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const api = axios.create(options)
export const apiWithHeaders = axios.create(options)

export const wp = axios.create({
	baseURL: WORDPRESS_API_URL
})

apiWithHeaders.interceptors.request.use((config) => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

apiWithHeaders.interceptors.response.use(
	(config) => config,
	async (error) => {
		const errorConfig = error.config

		const conditions =
			(error?.response?.status === 401 ||
				catchErrorMessage(error) === 'JWT is expired' ||
				catchErrorMessage(error) === 'JWT must be provided') &&
			Boolean(error.config) &&
			!error.config._isRetry

		if (conditions) {
			errorConfig._isRetry = true

			try {
				await authService.getTokens()
				return apiWithHeaders.request(errorConfig)
			} catch (error) {
				catchErrorMessage(error) === 'Refresh token is not passed' &&
					removeAccessToken()
			}
		}

		throw error
	}
)
