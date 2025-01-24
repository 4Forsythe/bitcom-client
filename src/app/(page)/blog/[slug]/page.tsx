import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { Post } from '@/components/Post'
import { getBlogPost } from '@/utils/get-blog-post'

export const generateMetadata = async ({
	params
}: IPostPageProps): Promise<Metadata> => {
	const { slug } = params

	const post = await getBlogPost(slug)

	if (post) {
		const { title, reading, lastModified } = post

		return {
			title: title,
			description: `Статья «${title}» опубликована ${new Date(lastModified).toLocaleDateString()} г. Ожидаемая продолжительность изучения — ${reading > 0 ? `${reading} минут` : 'менее минуты'}.`
		}
	}

	return {}
}

interface IPostPageProps {
	params: { slug: string }
}

export default async function PostPage({ params }: IPostPageProps) {
	const post = await getBlogPost(params.slug)

	if (!post) return notFound()

	return <Post {...post} />
}
