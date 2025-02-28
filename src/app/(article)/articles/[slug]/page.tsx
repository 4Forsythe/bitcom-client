import type { Metadata } from 'next'

import { cache } from 'react'
import { notFound } from 'next/navigation'

import { WordpressPage } from '@/components'

import { wordpressService } from '@/services/wordpress.service'

const getWordpressPage = cache(async (slug: string) => {
	try {
		const data = await wordpressService.getPage(slug)
		return data
	} catch (error) {
		console.error('[WORDPRESS_PAGE] Failed to getWordpressPage:', error)
	}
})

export const generateMetadata = async ({
	params
}: Props): Promise<Metadata> => {
	const { slug } = params

	const data = await getWordpressPage(slug)

	if (data) {
		const { title, excerpt } = data
		return {
			title: title.rendered,
			description: excerpt.rendered
		}
	}

	return {}
}

interface Props {
	params: { slug: string }
}

export default async function ArticlePage({ params }: Props) {
	const data = await getWordpressPage(params.slug)

	if (!data) return notFound()

	return <WordpressPage {...data} />
}
