import React from 'react'
import type { Metadata } from 'next'

import { NO_INDEX } from '@/constants'
import { AddProductConstructor } from '@/components'

export const metadata: Metadata = {
	title: 'Добавить новый товар',
	...NO_INDEX
}

export default function AddProductPage() {
	return (
		<React.Suspense>
			<AddProductConstructor />
		</React.Suspense>
	)
}
