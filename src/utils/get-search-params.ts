export type SearchParamsType = { [key: string]: string | undefined }

export const getSearchParams = (searchParams?: SearchParamsType) => {
	const query =
		searchParams && searchParams['q'] ? searchParams['q'] : undefined

	const category =
		searchParams && searchParams['category']
			? searchParams['category']
			: undefined
	const device =
		searchParams && searchParams['device'] ? searchParams['device'] : undefined

	const brand =
		searchParams && searchParams['brand'] ? searchParams['brand'] : undefined
	const model =
		searchParams && searchParams['model'] ? searchParams['model'] : undefined

	const sortBy =
		searchParams && searchParams['sortBy'] ? searchParams['sortBy'] : undefined
	const orderBy =
		searchParams && searchParams['orderBy']
			? searchParams['orderBy']
			: undefined

	const page =
		searchParams && searchParams['page'] ? Number(searchParams['page']) ?? 1 : 1
	const limit =
		searchParams && searchParams['limit']
			? Number(searchParams['limit']) ?? 10
			: 10

	return {
		query,
		category,
		device,
		brand,
		model,
		sortBy,
		orderBy,
		page,
		limit
	}
}
