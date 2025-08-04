'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useUserStore } from '@/store/user'
import { authService } from '@/services/auth.service'

import type { LoginFormType } from '@/types/auth.types'

export function useLogin() {
	const queryClient = useQueryClient()

	const { setUser } = useUserStore()

	const { mutate, isPending, isError, error } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: LoginFormType) => authService.login(data),
		retry: 0,
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			setUser(response.data.user)
		}
	})

	return { mutate, isPending, isError, error }
}
