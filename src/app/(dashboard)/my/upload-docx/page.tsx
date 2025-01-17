import type { Metadata } from 'next'

import { Heading } from '@/components'
import { UploadDocx } from './upload-docx'

import { NO_INDEX } from '@/constants'

export const metadata: Metadata = {
	title: 'Загрузить статью',
	...NO_INDEX
}

export default async function UploadDocxPage() {
	return (
		<>
			<Heading title='Загрузить статью' />
			<UploadDocx />
		</>
	)
}
