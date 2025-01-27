import { type NextRequest } from 'next/server'

const USERNAME = process.env.BASIC_AUTH_USERNAME
const PASSWORD = process.env.BASIC_AUTH_PASSWORD

export function checkBasicAuth(req: NextRequest) {
	const auth = req.headers.get('authorization')

	if (!auth || !auth.startsWith('Basic')) return false

	const base64 = auth.split(' ')[1]
	const credentials = Buffer.from(base64, 'base64').toString('ascii')

	const [username, password] = credentials.split(':')

	if (username === USERNAME && password === PASSWORD) return true

	return false
}
