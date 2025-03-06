import { cache } from 'react'
import { notFound } from 'next/navigation'

import { Breadcrumb, ArticleList } from '@/components'

import { ROUTE } from '@/config/routes.config'
import { wordpressService } from '@/services/wordpress.service'

const getArticles = cache(async () => {
	try {
		const data = await wordpressService.getAllPages()
		return data
	} catch (error) {
		console.error('[ARTICLES] Failed to getArticles:', error)
	}
})

export default async function ArticlesPage() {
	const articles = await getArticles()

	if (!articles || articles.length === 0) return notFound()

	return (
		<>
			<Breadcrumb
				value='Информация'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<ArticleList items={articles} />
		</>
	)
}
