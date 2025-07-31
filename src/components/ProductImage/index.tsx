import React from 'react'
import Image from 'next/image'

import clsx from 'clsx'
import { ImageIcon, Loader2 } from 'lucide-react'

import styles from './product-image.module.scss'

interface Props {
	src?: string
	width: number
	height: number
	fill?: boolean
	size?: 'large' | 'medium' | 'small' | 'thumbnail'
	isPlaceholder?: boolean
	alt: string
	priority?: boolean
	className?: string
	onClick?: () => void
}

export const ProductImage: React.FC<Props> = ({
	src,
	width,
	height,
	size = 'medium',
	isPlaceholder,
	alt,
	priority,
	className,
	onClick
}) => {
	const [isLoaded, setIsLoaded] = React.useState(false)
	const [isError, setIsError] = React.useState(false)

	const handleLoadImage = () => setIsLoaded(true)
	const handleErrorImage = () => {
		setIsError(true)
		setIsLoaded(true)
	}

	React.useEffect(() => {
		if (!src) {
			setIsLoaded(true)
			setIsError(false)
		}
	})

	return (
		<div
			className={clsx(styles.container, className, {
				[styles.large]: size === 'large',
				[styles.medium]: size === 'medium',
				[styles.small]: size === 'small',
				[styles.thumbnail]: size === 'thumbnail',
				[styles.clickable]: src && !!onClick
			})}
			onClick={onClick}
		>
			{!isLoaded && !isError && (
				<div className={styles.loader}>
					<Loader2
						className={styles.icon}
						size={32}
					/>
				</div>
			)}

			{(isError || (!isPlaceholder && !src)) && (
				<div className={styles.placeholder}>
					<ImageIcon
						className={styles.icon}
						size={32}
					/>
				</div>
			)}

			{!isError && src && (
				<Image
					className={clsx(styles.image, {
						[styles.hidden]: !isLoaded,
						[styles.mask]: isPlaceholder && src
					})}
					src={src}
					width={width}
					height={height}
					onLoad={handleLoadImage}
					onError={handleErrorImage}
					priority={priority}
					alt={alt}
				/>
			)}
		</div>
	)
}
