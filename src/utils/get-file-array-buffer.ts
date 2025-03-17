import axios from 'axios'

export async function getFileArrayBuffer(url: string): Promise<object> {
	const file = await axios.get(url, {
		responseType: 'arraybuffer'
	})

	return file.data
}
