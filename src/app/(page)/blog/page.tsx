import { Breadcrumb, Heading, PostList } from '@/components'

import { getSearchParams } from '@/utils/get-search-params'
import { getPostMetadata } from '@/utils/get-post-metadata'

import { ROUTE } from '@/config/routes.config'

const getPosts = (searchParams?: { [key: string]: string | undefined }) => {
	const { page, limit } = getSearchParams(searchParams)

	return getPostMetadata({
		take: limit,
		skip: (page - 1) * limit
	})
}

export const generateMetadata = ({ searchParams }: BlogPageProps) => {
	const data = getPosts(searchParams)

	if (!data) {
		return {
			title: 'Техноблог «БитКом» — самое интересное в мире техники'
		}
	}

	const items = data.map((item) => item.title).join(', ')

	return {
		title: 'Техноблог «БитКом» — полезные статьи в мире техники',
		description: `Читать самые последние статьи на техноблоге «БитКом» о промышленной и электронной технике. ${items} и т.д.`
	}
}

interface BlogPageProps {
	searchParams?: { [key: string]: string | undefined }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const posts = getPosts(searchParams)

	return (
		<>
			<Breadcrumb
				value='Блог'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<Heading title='Блог' />
			<PostList items={posts} />
		</>
	)
}
