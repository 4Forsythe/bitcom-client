import { Breadcrumb, Heading, PostList } from '@/components'

import { getSearchParams } from '@/utils/get-search-params'
import { getBlogMetadata } from '@/utils/get-blog-metadata'

import { ROUTE } from '@/config/routes.config'

const getPosts = async (searchParams?: {
	[key: string]: string | undefined
}) => {
	const { page, limit } = getSearchParams(searchParams)

	return getBlogMetadata({
		take: limit,
		skip: (page - 1) * limit
	})
}

interface BlogPageProps {
	searchParams?: { [key: string]: string | undefined }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const posts = await getPosts(searchParams)

	return (
		<>
			<Breadcrumb
				value='Блог'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<Heading title='Техноблог' />
			<PostList items={posts} />
		</>
	)
}
