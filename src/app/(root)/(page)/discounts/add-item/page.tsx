import React from 'react'
import type { Metadata } from 'next'

import { NO_INDEX } from '@/constants'
import { AddDiscountConstructor } from '@/components'

export const metadata: Metadata = {
	title: 'Добавить новую акцию',
	...NO_INDEX
}

export default function AddDiscountPage() {
	return (
		<React.Suspense>
			<AddDiscountConstructor />
		</React.Suspense>
	)
}
