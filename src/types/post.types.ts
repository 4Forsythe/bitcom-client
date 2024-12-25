import { UserType } from './user.types'

export type PostType = {
	slug: string

	title: string
	description: string
	imageUrl: string
	author: string
	tags: string[]
	content?: string

	createdAt: string
}

export type PostsType = {
	items: PostType[]
	count: number
}

export type PostParams = {
	id?: string
	sortBy?: string
	orderBy?: string
	take?: number
	skip?: number
}

export type PostFormType = {
	title: string
	content: string
}
