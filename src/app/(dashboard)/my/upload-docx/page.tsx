import type { Metadata } from 'next'

import { Heading, UploadDocx } from '@/components'
import { getBlogMetadata } from '@/utils/get-blog-metadata'

import { NO_INDEX } from '@/constants'

export const metadata: Metadata = {
	title: 'Загрузить статью',
	...NO_INDEX
}

export default async function UploadDocxPage() {
	const metadata = await getBlogMetadata()

	return (
		<>
			<Heading title='Загрузить статью' />
			<UploadDocx items={metadata} />
		</>
	)
}
