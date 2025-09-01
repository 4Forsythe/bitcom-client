import React from 'react'
import type { Metadata } from 'next'

import { Heading, ProductArchiveList } from '@/components'

import { NO_INDEX } from '@/constants'

export const metadata: Metadata = {
	title: 'Архив и черновики',
	...NO_INDEX
}

export default async function MyProductsPage() {
	return (
		<>
			<Heading title='Архив и черновики' />
			<React.Suspense>
				<ProductArchiveList />
			</React.Suspense>
		</>
	)
}
