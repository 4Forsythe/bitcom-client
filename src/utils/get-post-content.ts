import fs from 'fs'
import path from 'path'
import slugify from 'slugify'
import matter from 'gray-matter'

import { readDocFile } from '@/utils/read-doc-file'

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

			if (compile.content && slugify(compile.data.title) === slug) {
				return compile
			}
		}

		continue
	}
}

export async function getBlogPost(slug: string) {
	const fileDir = 'public/blog'

	const isDirExist = fs.existsSync(fileDir)

	if (!isDirExist) await fs.promises.mkdir(fileDir)

	const files = await fs.promises.readdir(fileDir)

	const file = files.find((file) => {
		const originalName = path.basename(file, path.extname(file)).toLowerCase()
		return slug === slugify(originalName).toLowerCase()
	})

	if (!file) return null

	const filePath = path.join(fileDir, file)

	const html = await readDocFile(filePath)
	const originalName = path.basename(file, path.extname(file))

	return {
		slug: slugify(originalName).toLowerCase(),
		title: originalName,
		content: matter(html)
	}
}
