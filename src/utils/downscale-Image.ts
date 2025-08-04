export const downscaleImage = async (
	file: File,
	maxWidth = 150,
	maxHeight = 115,
	quality = 0.8
): Promise<File> => {
	const bitmap = await createImageBitmap(file)

	const scale = Math.min(maxWidth / bitmap.width, maxHeight / bitmap.height, 1)
	const targetW = Math.floor(bitmap.width * scale)
	const targetH = Math.floor(bitmap.height * scale)

	const canvas = new OffscreenCanvas(targetW, targetH)
	const ctx = canvas.getContext('2d')!
	ctx.drawImage(bitmap, 0, 0, targetW, targetH)

	const blob = await canvas.convertToBlob({
		type: 'image/webp',
		quality
	})

	return new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
		type: 'image/webp'
	})
}
