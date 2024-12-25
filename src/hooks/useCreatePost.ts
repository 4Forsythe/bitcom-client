'use client'

import { useQueryClient, useMutation } from '@tanstack/react-query'

import type { PostFormType, PostType } from '@/types/post.types'
import { postService } from '@/services/post.service'

export function useCreatePost() {
	const queryClient = useQueryClient()

	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['create post'],
		mutationFn: (data: PostFormType) => postService.create(data),
		onSuccess: (data: PostType) => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			return data
		}
	})

	return { mutate, isPending, isSuccess }
}
