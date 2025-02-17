'use client'

import React from 'react'

import clsx from 'clsx'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

import { NavButtons } from './NavButtons'
import { useWindowSize } from '@/hooks/useWindowSize'

import styles from './Carousel.module.scss'

import 'swiper/css'

export type CarouselSlideType = {
	id: string
	tag: string
	imageUrl: string
}

interface CarouselProps {
	slides: React.ReactNode[]
	loop?: boolean
	speed?: number
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
	speed = undefined,
	autoplay = 0,
	navigation = false,
	spaceBetween = 0,
	slidesPerView = 3,
	breakpoints,
	className
}) => {
	SwiperCore.use([Autoplay])

	const getSlidesPerView = (): number => {
		if (!breakpoints) return slidesPerView

		const { width } = useWindowSize()

		if (!width) return slidesPerView

		const matches = Object.keys(breakpoints)
			.map(Number)
			.filter((breakpoint) => breakpoint <= width)
			.sort((a, b) => b - a)

		if (matches.length > 0) {
			const lastBreakpoint = matches[0]
			return breakpoints[lastBreakpoint]?.slidesPerView ?? slidesPerView
		}

		return slidesPerView
	}

	const isNavButtonsVisible = navigation && slides.length > getSlidesPerView()

	return (
		<>
			<Swiper
				tag='menu'
				role='list'
				className={clsx(styles.container, className)}
				modules={[Navigation, Autoplay]}
				loop={loop}
				speed={speed}
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
					<SwiperSlide
						key={index}
						role='listitem'
					>
						{slide}
					</SwiperSlide>
				))}

				{isNavButtonsVisible && (
					<NavButtons
						asHint={!!autoplay}
						isLoop={loop}
					/>
				)}
			</Swiper>
		</>
	)
}
