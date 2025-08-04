import React from 'react'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useModal } from '@/hooks/useModal'
import { useWindowSize } from '@/hooks/useWindowSize'
import { SERVER_BASE_URL } from '@/constants'
import { ProductImage } from '@/components/ProductImage'
import { ProductPreviewModal } from '../ProductPreviewModal'

import type { ProductImageType } from '@/types/product.types'
import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './product-image-gallery.module.scss'

interface Props {
	images: ProductImageType[] | []
	category: ProductCategoryType
	alt: string
}

export const ProductImageGallery: React.FC<Props> = ({
	images,
	category,
	alt
}) => {
	const [targetImage, setTargetImage] = React.useState(0)

	const imageSrc =
		images.length > 0
			? `${SERVER_BASE_URL}/${images[targetImage].url}`
			: category.imageUrl
				? `/static/${category.imageUrl}`
				: undefined

	const { onOpen } = useModal()
	const { width } = useWindowSize()

	const onSlidePrev = () => {
		setTargetImage((prev) => (prev - 1 >= 0 ? prev - 1 : images.length - 1))
	}

	const onSlideNext = () => {
		setTargetImage((prev) => (prev + 1 >= images.length ? 0 : prev + 1))
	}

	const onShowPreview = () => {
		if (images.length > 0 && width && width >= 768) {
			onOpen(
				<ProductPreviewModal
					targetIndex={targetImage}
					images={images}
					alt={alt}
				/>
			)
		}
	}

	return (
		<div className={styles.container}>
			<div
				key={images[targetImage] ? images[targetImage].url : undefined}
				className={styles.main}
			>
				<ProductImage
					src={imageSrc}
					isPlaceholder={!images.length && !!category.imageUrl}
					width={608}
					height={456}
					size='large'
					priority
					alt={alt}
					onClick={onShowPreview}
				/>
				{images.length > 1 && (
					<React.Fragment>
						<button
							className={clsx(styles.navButton, styles.left)}
							onClick={onSlidePrev}
						>
							<ChevronLeft
								className={styles.icon}
								size={32}
							/>
						</button>
						<button
							className={clsx(styles.navButton, styles.right)}
							onClick={onSlideNext}
						>
							<ChevronRight
								className={styles.icon}
								size={32}
							/>
						</button>
					</React.Fragment>
				)}
			</div>
			{images.length > 1 && (
				<div className={styles.list}>
					{images.map((image, index) => (
						<ProductImage
							key={image.id}
							src={
								image
									? `${SERVER_BASE_URL}/${image.url}`
									: category.imageUrl
										? `/static/${category.imageUrl}`
										: undefined
							}
							isPlaceholder={!image && !!category.imageUrl}
							width={75}
							height={55}
							size='thumbnail'
							alt={`${alt} ${index + 1}`}
							className={clsx(styles.listItem, {
								[styles.target]: targetImage === index
							})}
							onClick={() => setTargetImage(index)}
						/>
					))}
				</div>
			)}
		</div>
	)
}
