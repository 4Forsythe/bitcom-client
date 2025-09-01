import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import { useModal } from '@/hooks/useModal'
import { useWindowSize } from '@/hooks/useWindowSize'
import { SERVER_BASE_URL } from '@/constants'
import { ProductImage } from '@/components/ProductImage'
import { ProductPreviewModal } from '../ProductPreviewModal'
import { ProductImageGalleryNavigation } from './product-image-gallery-navigation'
import { ProductImageGalleryPagination } from './product-image-gallery-pagination'

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

	const onShowPreview = () => {
		if (images.length > 0 && width && width >= 768) {
			onOpen(
				<ProductPreviewModal
					images={images}
					activeIndex={targetImage}
					alt={alt}
				/>
			)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				{images.length > 1 ? (
					<React.Fragment>
						<Swiper
							tag='menu'
							role='list'
							className={styles.slider}
							modules={[Navigation]}
							style={{ overflow: 'visible' }}
							spaceBetween={8}
							slidesPerView={1}
							navigation={{
								nextEl: '.swiper-navigation-next',
								prevEl: '.swiper-navigation-prev'
							}}
							loop
							initialSlide={targetImage}
							onSlideChange={(slider) => setTargetImage(slider.realIndex)}
						>
							{images.map((image, index) => (
								<SwiperSlide
									key={image.id}
									role='listitem'
								>
									<ProductImage
										key={image.id}
										src={
											image
												? `${SERVER_BASE_URL}/${image.url}`
												: category.imageUrl
													? `/static/${category.imageUrl}`
													: undefined
										}
										isPlaceholder={!images.length && !!category.imageUrl}
										width={608}
										height={608}
										size='large'
										priority={index === 0}
										alt={alt}
										onClick={onShowPreview}
									/>
								</SwiperSlide>
							))}

							<ProductImageGalleryNavigation
								asHint
								isLoop
							/>

							{images.length > 1 && (
								<ProductImageGalleryPagination
									images={images}
									activeIndex={targetImage}
									category={category}
									alt={alt}
									setActiveIndex={(index) => setTargetImage(index)}
								/>
							)}
						</Swiper>
					</React.Fragment>
				) : (
					<ProductImage
						src={imageSrc}
						isPlaceholder={!images.length && !!category.imageUrl}
						width={608}
						height={608}
						size='large'
						priority
						alt={alt}
						onClick={onShowPreview}
					/>
				)}
			</div>
		</div>
	)
}
