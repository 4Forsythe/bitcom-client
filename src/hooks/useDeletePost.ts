'use client'

import { useQueryClient, useMutation } from '@tanstack/react-query'

import type { PostType } from '@/types/post.types'
import { postService } from '@/services/post.service'

export function useDeletePost() {
	const queryClient = useQueryClient()

	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['delete post'],
		mutationFn: (id: string) => postService.remove(id),
		onSuccess: (data: PostType) => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			return data
		}
	})

	return { mutate, isPending, isSuccess }
}
