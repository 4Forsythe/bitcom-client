import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StaticPage } from '@/components'

import { getPostMetadata } from '@/utils/get-post-metadata'
import { getPostContent } from '@/utils/get-post-content'

export const generateStaticParams = async () => {
	const pages = getPostMetadata({ path: 'public/pages' })

	if (!pages) return notFound()

	return pages.map((page) => ({ slug: page.slug }))
}

export const generateMetadata = ({ params }: IMarkdownPageProps): Metadata => {
	const { slug } = params

	const page = getPostContent(slug, 'public/pages')

	if (page) {
		const { title, description } = page.data as Record<string, string>

		return {
			title: title && title,
			description: description && description
		}
	}

	return {}
}

interface IMarkdownPageProps {
	params: { slug: string }
}

export default function MarkdownPage({ params }: IMarkdownPageProps) {
	const page = getPostContent(params.slug, 'public/pages')

	if (!page) return notFound()

	return (
		<StaticPage
			title={page.data.title}
			content={page.content}
		/>
	)
}
