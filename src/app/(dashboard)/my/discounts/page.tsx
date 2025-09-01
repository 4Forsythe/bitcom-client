import React from 'react'
import type { Metadata } from 'next'

import { Heading, DiscountArchiveList } from '@/components'

import { NO_INDEX } from '@/constants'

export const metadata: Metadata = {
	title: 'Акции',
	...NO_INDEX
}

export default async function MyDiscountsPage() {
	return (
		<>
			<Heading title='Акции' />
			<React.Suspense>
				<DiscountArchiveList />
			</React.Suspense>
		</>
	)
}
