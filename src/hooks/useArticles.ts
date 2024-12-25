'use client'

import { useQuery } from '@tanstack/react-query'

import { postService } from '@/services/post.service'

export function useArticles() {
	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['posts'],
		queryFn: () => postService.getByAuthor()
	})

	return { data, isLoading, isSuccess, isError }
}
