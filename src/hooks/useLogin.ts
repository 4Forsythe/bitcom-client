'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { LoginFormType } from '@/types/auth.types'
import { authService } from '@/services/auth.service'
import { useUserStore } from '@/store/user'

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
