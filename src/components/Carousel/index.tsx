'use client'

import SwiperCore from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

import { NavButtons } from './NavButtons'

import styles from './Carousel.module.scss'

import 'swiper/css'
import React from 'react'
import clsx from 'clsx'

interface CarouselProps {
	slides: React.ReactNode[]
	loop?: boolean
	autoplay?: number
	navigation?: boolean
	pagination?: boolean
	spaceBetween?: number
	slidesPerView?: number
	breakpoints?: {
		[width: number]: { slidesPerView?: number; spaceBetween?: number }
	}
	className?: string
}

export const Carousel: React.FC<CarouselProps> = ({
	slides,
	loop = false,
	autoplay = 0,
	navigation = false,
	spaceBetween = 0,
	slidesPerView = 3,
	breakpoints,
	className
}) => {
	SwiperCore.use([Autoplay])

	return (
		<>
			<Swiper
				className={clsx(styles.container, className)}
				modules={[Navigation, Autoplay]}
				loop={loop}
				spaceBetween={spaceBetween}
				slidesPerView={slidesPerView}
				navigation={
					navigation && {
						nextEl: '.swiper-navigation-next',
						prevEl: '.swiper-navigation-prev'
					}
				}
				autoplay={
					autoplay > 0 && {
						delay: autoplay
					}
				}
				breakpoints={breakpoints}
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>{slide}</SwiperSlide>
				))}
				{navigation && <NavButtons />}
			</Swiper>
		</>
	)
}
