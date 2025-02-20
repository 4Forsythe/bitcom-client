import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { Breadcrumb, StaticPage } from '@/components'

import { ROUTE } from '@/config/routes.config'
import { wordpressService } from '@/services/wordpress.service'

export const generateMetadata = async ({
	params
}: Props): Promise<Metadata> => {
	const { slug } = params

	const data = await wordpressService.getPage(slug)

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

export default async function WordpressPage({ params }: Props) {
	const data = await wordpressService.getPage(params.slug)

	if (!data) return notFound()

	return <StaticPage {...data} />
}
