export type ProductCategoryParamsType = {
	flat?: boolean
	take?: number
	skip?: number
}

export type ProductCategoryType = {
	id: string
	name: string
	imageUrl?: string
	parentId?: string
	children: ProductCategoryType[]
}

export type ProductCategoriesType = {
	items: ProductCategoryType[]
	count: number
}
