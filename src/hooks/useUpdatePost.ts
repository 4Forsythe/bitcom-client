'use client'

import { useQueryClient, useMutation } from '@tanstack/react-query'

import type { PostFormType, PostType } from '@/types/post.types'
import { postService } from '@/services/post.service'

export function useUpdatePost() {
	const queryClient = useQueryClient()

	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['update post'],
		mutationFn: ({ id, data }: { id: string; data: PostFormType }) =>
			postService.update(id, data),
		onSuccess: (data: PostType) => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			return data
		}
	})

	return { mutate, isPending, isSuccess }
}
