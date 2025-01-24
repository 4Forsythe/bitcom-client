import fs from 'fs'
import path from 'path'
import slugify from 'slugify'

import type { FrontmatterPostType } from '@/types/post.types'

type GetBlogMetadataParams = {
	take?: number
	skip?: number
}

export async function getBlogMetadata(
	params?: GetBlogMetadataParams
): Promise<FrontmatterPostType[] | []> {
	const fileDir = 'public/blog'

	const isDirExist = fs.existsSync(fileDir)

	if (!isDirExist) await fs.promises.mkdir(fileDir)

	const files = await fs.promises.readdir(fileDir)

	const docFiles = files.filter((file) => {
		const extname = path.extname(file).toLowerCase()
		return extname === '.doc' || extname === '.docx'
	})

	if (!docFiles.length) return []

	const skip = params?.skip || 0
	const take = params?.take || docFiles.length

	const docs = docFiles.slice(skip, skip + take)

	const metadata = await Promise.all(
		docs.map(async (file) => {
			const filePath = path.join(fileDir, file)

			const fileStats = fs.statSync(filePath)
			const originalName = path.basename(file, path.extname(file))
			const lastModified = fileStats.mtime

			return {
				slug: slugify(originalName).toLowerCase(),
				title: originalName,
				fileName: file,
				lastModified
			}
		})
	)

	return metadata
}
