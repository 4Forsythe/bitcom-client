import fs from 'fs'
import matter from 'gray-matter'
import { transliterate, slugify } from 'transliteration'

import type { PostType } from '@/types/post.types'

type GetPostMetadataParams = {
	path?: string
	take?: number
	skip?: number
}

export function getPostMetadata(
	params?: GetPostMetadataParams
): PostType[] | [] {
	const baseUrl = params?.path || 'public/blog'

	const folder = `${baseUrl}/`
	const files = fs.readdirSync(folder)

	const posts = files.filter((file) => file.endsWith('.md'))

	if (!posts) return []

	const metadata = posts.map((filename) => {
		const contents = fs.readFileSync(`${baseUrl}/${filename}`, 'utf-8')

		const compile = matter(contents)

		return {
			slug: slugify(transliterate(compile.data.title)),
			title: compile.data.title,
			description: compile.data.description,
			author: compile.data.author,
			imageUrl: compile.data.imageUrl,
			tags: compile.data.tags,
			createdAt: compile.data.createdAt
		}
	})

	return metadata.slice(
		params?.skip || 0,
		(params?.skip || 0) + (params?.take || metadata.length)
	)
}
