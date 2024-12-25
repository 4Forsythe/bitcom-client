'use client'

import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useUserStore } from '@/store/user'
import { userService } from '@/services/user.service'

import type { UserFormType } from '@/types/user.types'

export function useUpdateProfile() {
	const queryClient = useQueryClient()

	const { setUser } = useUserStore()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: UserFormType) => userService.update(data),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			setUser(response)
		}
	})

	return {
		updateProfile: mutate,
		isUpdateProfilePending: isPending,
		isUpdateProfileSuccess: isSuccess,
		isUpdateProfileError: isError
	}
}
