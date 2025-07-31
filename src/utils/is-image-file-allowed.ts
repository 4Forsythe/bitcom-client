interface IIsImageFileAllowedOptions {
	allowedExtensions: string[]
	allowedMimeTypes: string[]
}

const defaultOptions = {
	allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
	allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
}

export const isImageFileAllowed = (
	file: File,
	options: IIsImageFileAllowedOptions = defaultOptions
) => {
	const { allowedExtensions, allowedMimeTypes } = options
	const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))

	return allowedExtensions.includes(ext) && allowedMimeTypes.includes(file.type)
}
