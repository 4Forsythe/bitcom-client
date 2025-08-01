import { cache } from 'react'
import { notFound } from 'next/navigation'

import { AddProductConstructor } from '@/components'
import { productService } from '@/services/product.service'

import type { ProductType } from '@/types/product.types'

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

	if (!productId) {
		return <AddProductConstructor />
	}

	let product: ProductType

	try {
		product = await getProduct(productId)
	} catch (error) {
		notFound()
	}

	return <AddProductConstructor product={product} />
}
