import type { Metadata } from 'next'

import { NO_INDEX } from '@/constants'
import { AddProductConstructor } from '@/components'

export const metadata: Metadata = {
	title: 'Добавить новый товар',
	...NO_INDEX
}

export default async function AddProductPage() {
	return <AddProductConstructor />
}
