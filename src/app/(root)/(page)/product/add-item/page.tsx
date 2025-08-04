import type { Metadata } from 'next'

import { NO_INDEX } from '@/constants'
import { AddProductConstructor } from '@/components'

export const metadata: Metadata = {
	title: 'Добавить новый товар',
	...NO_INDEX
}

interface AddProductPageProps {
	searchParams: { [key: string]: string | undefined }
}

export default async function AddProductPage({
	searchParams
}: AddProductPageProps) {
	const { productId } = searchParams

	return <AddProductConstructor productId={productId} />
}
