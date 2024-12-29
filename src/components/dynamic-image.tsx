import React from 'react'
import Image, { type ImageProps } from 'next/image'

import { getPlaiceholder } from 'plaiceholder'

interface IDynamicImage extends ImageProps {
	className?: string
}

export const getImage = async (url: string) => {
	const response = await fetch(url)

	if (!response.ok) return undefined

	const buffer = Buffer.from(await response.arrayBuffer())

	const {
		metadata: { width, height },
		...placeholder
	} = await getPlaiceholder(buffer, { size: 10 })

	return { image: { url, width, height }, ...placeholder }
}

export const DynamicImage: React.FC<IDynamicImage> = async ({
	src,
	className,
	...props
}) => {
	const buffer = await getImage(src.toString())

	if (!buffer) return null

	const { image, base64 } = buffer

	return (
		<Image
			className={className}
			src={src}
			placeholder='blur'
			blurDataURL={base64}
			{...image}
			{...props}
		/>
	)
}
