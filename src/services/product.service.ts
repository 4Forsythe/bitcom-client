import { api, apiWithHeaders } from '@/api/interceptors/api-instance'

import type {
	ProductType,
	ProductsType,
	ProductParamsType,
	ArchiveProductParamsType,
	CreateProductType,
	UpdateProductType,
	UploadImagesPayloadType
} from '@/types/product.types'

class ProductService {
	private endpoint = '/product'

	async create(data: CreateProductType): Promise<ProductType> {
		const response = await apiWithHeaders.post(this.endpoint, data)
		return response.data
	}

	async update(id: string, data: UpdateProductType): Promise<ProductType> {
		const response = await apiWithHeaders.patch(`${this.endpoint}/${id}`, data)
		return response.data
	}

	async uploadImages(
		id: string,
		data: UploadImagesPayloadType
	): Promise<ProductType> {
		const formData = new FormData()
		const { images, preserved } = data

		formData.append('product', JSON.stringify({ preserved }))
		images.forEach((image) => {
			formData.append('images', image.file)
		})

		const orders = images.map((image) => image.order)
		formData.append('orders', JSON.stringify(orders))

		const response = await apiWithHeaders.post(
			`${this.endpoint}/${id}/upload-images`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)
		return response.data
	}

	async getAll(params?: ProductParamsType): Promise<ProductsType> {
		const response = await api.get(this.endpoint, { params })
		return response.data
	}

	async getArchive(params?: ArchiveProductParamsType): Promise<ProductsType> {
		const response = await apiWithHeaders.get(`${this.endpoint}/archive`, {
			params
		})
		return response.data
	}

	async getDiscount(params?: ProductParamsType): Promise<ProductsType> {
		const response = await api.get(`${this.endpoint}/discount`, { params })
		return response.data
	}

	async getSimilar(
		id: string,
		params?: { take: number }
	): Promise<ProductsType> {
		const response = await api.get<ProductsType>(
			`${this.endpoint}/similar/${id}`,
			{ params }
		)
		return response.data
	}

	async getByIds(ids: string[]): Promise<ProductsType> {
		const response = await api.get<ProductsType>(
			`${this.endpoint}?ids=${ids.join(',')}`
		)
		return response.data
	}

	async getOne(id: string): Promise<ProductType> {
		const response = await api.get<ProductType>(`${this.endpoint}/${id}`)
		return response.data
	}

	async getTotal(): Promise<number> {
		const response = await api.get<number>(`${this.endpoint}/total`)
		return response.data
	}
}

export const productService = new ProductService()
