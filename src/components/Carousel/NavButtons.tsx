'use client'

import React from 'react'
import { useSwiper } from 'swiper/react'

import styles from './Carousel.module.scss'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

export const NavButtons = () => {
	const swiper = useSwiper()

	return (
		<div className={styles.navigation}>
			<button
				aria-label='Предыдущий слайд'
				className={clsx(styles.button, styles.prev)}
				onClick={() => swiper.slidePrev()}
			>
				<ChevronLeft className={styles.icon} />
			</button>
			<button
				aria-label='Следующий слайд'
				className={clsx(styles.button, styles.next)}
				onClick={() => swiper.slideNext()}
			>
				<ChevronRight className={styles.icon} />
			</button>
		</div>
	)
}
