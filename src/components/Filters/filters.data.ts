import { ROUTE } from '@/config/routes.config'

export type FilterItemType = {
	id: string
	name: string
	imageUrl?: string
	parentId?: string
	children?: FilterItemType[]
}

export const POST_CATEGORIES: FilterItemType[] = [
	{
		id: '1',
		name: 'Обзоры'
	}
]
