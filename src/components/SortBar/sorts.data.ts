export type SortType = {
	name: string
	property: string
	order: 'asc' | 'desc'
}

export const PRODUCT_SORTS: SortType[] = [
	{
		name: 'Сначала новые',
		property: 'createdAt',
		order: 'desc'
	},
	{
		name: 'Сначала недорогие',
		property: 'price',
		order: 'asc'
	},
	{
		name: 'Сначала дорогие',
		property: 'price',
		order: 'desc'
	},
	{
		name: 'По названию',
		property: 'name',
		order: 'asc'
	},
	{
		name: 'По количеству в наличии',
		property: 'count',
		order: 'desc'
	}
]

export const DISCOUNT_SORTS: SortType[] = [
	{
		name: 'Последние',
		property: 'startedAt',
		order: 'desc'
	},
	{
		name: 'Выгодные',
		property: 'amount',
		order: 'desc'
	},
	{
		name: 'Скоро закончатся',
		property: 'expiresAt',
		order: 'asc'
	}
]

export const POST_SORTS: SortType[] = [
	{
		name: 'Сначала популярные',
		property: 'views',
		order: 'desc'
	},
	{
		name: 'Сначала новые',
		property: 'createdAt',
		order: 'desc'
	},
	{
		name: 'Сначала старые',
		property: 'createdAt',
		order: 'asc'
	}
]
