'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import { SERVER_BASE_URL } from '@/constants'
import { ProductImageGalleryNavigation } from '../ProductImageGallery/product-image-gallery-navigation'
import { ProductImageGalleryPagination } from '../ProductImageGallery/product-image-gallery-pagination'

import type { ProductImageType } from '@/types/product.types'

import styles from './product-preview-modal.module.scss'

interface Props {
	images: ProductImageType[]
	activeIndex: number
	alt: string
}

export const ProductPreviewModal: React.FC<Props> = ({
	images,
	activeIndex,
	alt
}) => {
	const [targetImage, setTargetImage] = React.useState(activeIndex)

	return (
		<div className={styles.container}>
			<div className={styles.frame}>
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
						initialSlide={activeIndex}
						onSlideChange={(slider) => setTargetImage(slider.realIndex)}
					>
						{images.map((image, index) => (
							<SwiperSlide
								key={image.id}
								className={styles.slide}
								role='listitem'
							>
								<Image
									key={image.id}
									src={`${SERVER_BASE_URL}/${image.url}`}
									width={720}
									height={720}
									priority={index === 0}
									alt={alt}
								/>
							</SwiperSlide>
						))}

						<ProductImageGalleryNavigation isLoop />

						{images.length > 1 && (
							<ProductImageGalleryPagination
								images={images}
								alt={alt}
							/>
						)}
					</Swiper>
				</React.Fragment>
			</div>
		</div>
	)
}
