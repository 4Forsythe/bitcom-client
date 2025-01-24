'use server'

import fs from 'fs'
import path from 'path'
import iconv from 'iconv-lite'

export async function uploadDocFile(formData: FormData) {
	const file = formData.get('file') as File

	if (!file || !file.size) {
		throw new Error('Исходный файл поврежден или отсутствует')
	}

	const fileExtension = file.name.split('.')[1]

	if (fileExtension !== 'doc' && fileExtension !== 'docx') {
		throw new Error('Исходный файл должен быть в формате .doc или .docx')
	}

	const fileDir = 'public/blog'
	const isDirExist = fs.existsSync(fileDir)

	if (!isDirExist) fs.promises.mkdir(fileDir)

	const buffer = await file.arrayBuffer()
	const bufferData = Buffer.from(buffer)

	const decFileName = iconv.decode(Buffer.from(file.name, 'binary'), 'utf8')

	await fs.promises.writeFile(`${fileDir}/${decFileName}`, bufferData)
}

export async function deleteDocFile(fileName: string) {
	const fileDir = 'public/blog'
	const isDirExist = fs.existsSync(fileDir)

	if (!isDirExist) return

	const filePath = path.join(fileDir, fileName)
	const isFileExist = fs.existsSync(filePath)

	if (!isFileExist) return

	await fs.promises.rm(filePath)
}
