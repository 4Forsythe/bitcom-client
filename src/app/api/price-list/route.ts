import fs from 'fs'
import path from 'path'

import { checkBasicAuth } from '@/utils/check-basic-auth'

import { type NextRequest, NextResponse } from 'next/server'

const fileDir = path.join(process.cwd(), 'public/assets', 'prices')

export function GET() {
	try {
		const isDirExist = fs.existsSync(fileDir)

		if (!isDirExist) {
			return NextResponse.json([], { status: 200 })
		}

		const files = fs.readdirSync(fileDir)

		return NextResponse.json(files, { status: 200 })
	} catch (error) {
		console.error('[GET] api/price:', error)

		return NextResponse.json(
			{ message: 'Internal server error', error: (error as Error).message },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	if (!checkBasicAuth(req)) {
		return NextResponse.json(
			{ message: 'Unauthorized' },
			{
				status: 401,
				headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
			}
		)
	}

	try {
		const contentType = req.headers.get('content-type')

		if (!contentType || !contentType.startsWith('multipart/form-data')) {
			return NextResponse.json(
				{
					message:
						'Заголовок Content-Type ожидает значение "multipart/form-data"'
				},
				{ status: 400 }
			)
		}

		const isDirExist = await fs.promises
			.access(fileDir)
			.then(() => true)
			.catch(() => false)

		if (!isDirExist) {
			await fs.promises.mkdir(fileDir, { recursive: true })
		}

		const formData = await req.formData()
		const files = formData.getAll('file') as File[]

		if (!files.length) {
			return NextResponse.json(
				{ message: 'Для отправки запроса нужен как минимум один файл' },
				{ status: 400 }
			)
		}

		const mimeTypes = [
			'application/pdf',
			'application/vnd.ms-excel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		]

		const maxFileSize = 1024 * 1024 * 5

		const uploads = files.map(async (file) => {
			if (!mimeTypes.includes(file.type)) {
				return NextResponse.json(
					{ message: `Обнаружен неподдерживаемый формат файла: ${file.type}` },
					{ status: 400 }
				)
			}

			if (file.size > maxFileSize) {
				return NextResponse.json(
					{
						message: `Обнаружен слишком крупный файл: ${file.name} - ${file.size / 1024 / 1024} MB (ограничение до 5 MB)`
					},
					{ status: 400 }
				)
			}

			const bytes = await file.arrayBuffer()
			const buffer = Buffer.from(bytes)

			const fileName = file.name
			const filePath = path.join(fileDir, fileName)

			await fs.promises.writeFile(filePath, buffer)

			return { fileName, filePath }
		})

		const data = await Promise.all(uploads)

		return NextResponse.json(
			{
				...data
			},
			{ status: 201 }
		)
	} catch (error) {
		console.error('[POST] api/price:', error)

		return NextResponse.json(
			{ message: 'Internal server error', error: (error as Error).message },
			{ status: 500 }
		)
	}
}
