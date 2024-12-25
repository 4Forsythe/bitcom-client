'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useUserStore } from '@/store/user'
import { userService } from '@/services/user.service'

export function useProfile() {
	const { setUser } = useUserStore()

	const { data, error, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		retry: 0
	})

	React.useEffect(() => {
		if (isSuccess) setUser(data)
	}, [isSuccess])

	return {
		profile: data,
		profileError: error,
		isProfileLoading: isLoading,
		isProfileSuccess: isSuccess,
		isProfileError: isError
	}
}
