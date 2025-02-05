'use client'

import React from 'react'
import Image from 'next/image'

import clsx from 'clsx'
import { Carousel } from '@/components'

import { BRANDS } from './brands.data'

import styles from './brands-gallery.module.scss'

export const BrandsGallery: React.FC = () => {
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true)
		}
	}, [])

	if (!isMounted) return null

	return (
		<div className={clsx(styles.container, 'animate-opacity')}>
			<Carousel
				slides={BRANDS.map((slide) => (
					<div className={styles.cover}>
						<Image
							className={styles.image}
							width={1000}
							height={500}
							src={slide.imageUrl || '/static/image-placeholder.png'}
							blurDataURL='/static/image-placeholder.png'
							placeholder='blur'
							alt={slide.tag}
							priority
						/>
					</div>
				))}
				spaceBetween={14}
				slidesPerView={6}
				speed={3000}
				autoplay={1}
				loop
				breakpoints={{
					1160: {
						slidesPerView: 6
					},
					860: {
						slidesPerView: 5
					},
					630: {
						slidesPerView: 4
					},
					460: {
						slidesPerView: 3
					},
					320: {
						slidesPerView: 2
					},
					0: {
						slidesPerView: 1
					}
				}}
			/>
		</div>
	)
}
