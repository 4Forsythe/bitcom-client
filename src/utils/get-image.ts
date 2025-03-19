import { getPlaiceholder } from 'plaiceholder'

export const getImage = async (url: string) => {
	const response = await fetch(url)

	if (!response.ok) return undefined

	const buffer = Buffer.from(await response.arrayBuffer())

	const {
		metadata: { width, height },
		...placeholder
	} = await getPlaiceholder(buffer, { size: 50 })

	return { image: { url, width, height }, ...placeholder }
}
