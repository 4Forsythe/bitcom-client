import mammoth from 'mammoth'

export async function readDocFile(filePath: string) {
	const { value } = await mammoth.convertToHtml({ path: filePath })

	return value
}
