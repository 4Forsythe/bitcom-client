import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Post } from '@/components/Post'

import { getPostMetadata } from '@/utils/get-post-metadata'
import { getPostContent } from '@/utils/get-post-content'

import type { PostType } from '@/types/post.types'

export const generateMetadata = ({ params }: IPostPageProps): Metadata => {
	const { slug } = params

	const post = getPostContent(slug)

	if (post) {
		const { title, description, imageUrl, tags } = post.data as PostType

		return {
			title: title && title,
			description: description && description,
			keywords: tags && tags,
			openGraph: {
				images: [{ url: imageUrl }]
			}
		}
	}

	return {}
}

interface IPostPageProps {
	params: { slug: string }
}

export default async function PostPage({ params }: IPostPageProps) {
	const post = getPostContent(params.slug)

	if (!post) return notFound()

	const props = {
		...post.data,
		content: post.content
	} as PostType

	return <Post {...props} />
}
