import fs from 'fs'
import path from 'path'

const fileDir = path.join(process.cwd(), 'public/assets', 'prices')

export async function getPrices() {
	const isDirExist = fs.existsSync(fileDir)

	if (!isDirExist) {
		return []
	}

	const files = fs.readdirSync(fileDir)

	return files
}
