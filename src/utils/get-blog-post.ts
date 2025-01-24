import fs from 'fs'
import path from 'path'
import slugify from 'slugify'
import matter from 'gray-matter'

import { readDocFile } from '@/utils/read-doc-file'
import { calcReadingTime } from '@/utils/calc-reading-time'

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
	const fileStats = fs.statSync(filePath)

	const html = await readDocFile(filePath)
	const originalName = path.basename(file, path.extname(file))
	const lastModified = fileStats.mtime

	return {
		slug: slugify(originalName).toLowerCase(),
		title: originalName,
		content: matter(html),
		reading: calcReadingTime(html),
		lastModified
	}
}
