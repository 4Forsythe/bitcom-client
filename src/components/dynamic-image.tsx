import React from 'react'
import Image, { type ImageProps } from 'next/image'

import { getImage } from '@/utils/get-image'

interface IDynamicImage extends ImageProps {
	className?: string
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
