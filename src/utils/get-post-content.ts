import fs from 'fs'
import matter from 'gray-matter'
import { transliterate, slugify } from 'transliteration'

export function getPostContent(slug: string, path?: string) {
	const baseUrl = path ?? 'public/blog'

	const isDirExist = fs.existsSync(baseUrl)

	if (!isDirExist) return null

	const files = fs.readdirSync(baseUrl, 'utf-8')

	for (const file of files) {
		if (file.endsWith('.md')) {
			const filePath = `${baseUrl}/${file}`
			const content = fs.readFileSync(filePath, 'utf-8')
			const compile = matter(content)

			if (
				compile.content &&
				slugify(transliterate(compile.data.title)) === slug
			) {
				return compile
			}
		}

		continue
	}
}
