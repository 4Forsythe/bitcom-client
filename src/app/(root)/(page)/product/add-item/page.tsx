import { cache } from 'react'
import { notFound } from 'next/navigation'

import { AddProductConstructor } from '@/components'
import { productService } from '@/services/product.service'

const getProduct = cache(async (id: string) => {
	return productService.getOne(id)
})

interface AddProductPageProps {
	searchParams: { [key: string]: string | undefined }
}

export default async function AddProductPage({
	searchParams
}: AddProductPageProps) {
	const { productId } = searchParams

	if (productId) {
		const product = await getProduct(productId)
		return <AddProductConstructor product={product} />
	}

	return <AddProductConstructor />
}
