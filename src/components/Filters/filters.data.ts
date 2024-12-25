import { ROUTE } from '@/config/routes.config'

export type FilterItemType = {
	id: string
	name: string
	imageUrl?: string
}

export const POST_CATEGORIES: FilterItemType[] = [
	{
		id: '1',
		name: 'Обзоры'
	}
]
