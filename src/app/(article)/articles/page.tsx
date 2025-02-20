import { notFound } from 'next/navigation'

import { Breadcrumb, ArticleList } from '@/components'

import { ROUTE } from '@/config/routes.config'
import { wordpressService } from '@/services/wordpress.service'

export default async function ArticlesPage() {
	const data = await wordpressService.getAllPages()

	if (!data) return notFound()

	return (
		<>
			<Breadcrumb
				value='Информация'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<ArticleList items={data} />
		</>
	)
}
