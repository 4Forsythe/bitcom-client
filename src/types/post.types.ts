import type { GrayMatterFile } from 'gray-matter'

export type PostType = {
	slug: string
	title: string
	content: GrayMatterFile<string>
	reading: number
	lastModified: Date
}

export type FrontmatterPostType = {
	slug: string
	title: string
	fileName: string
	lastModified: Date
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
