import mammoth from 'mammoth'
import sanitizeHtml from 'sanitize-html'

export async function readDocFile(filePath: string) {
	const { value, messages } = await mammoth.convertToHtml({ path: filePath })

	return sanitizeHtml(value)
}
