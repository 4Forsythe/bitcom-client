'use client'

import React from 'react'

import clsx from 'clsx'
import { useSwiper } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './carousel.module.scss'

interface NavButtonsProps {
	asHint?: boolean
	isLoop?: boolean
}

export const NavButtons: React.FC<NavButtonsProps> = ({ asHint, isLoop }) => {
	const swiper = useSwiper()

	const [hasReachBeginning, setHasReachBeginning] = React.useState(
		!isLoop ? swiper.isBeginning : false
	)
	const [hasReachEnd, setHasReachEnd] = React.useState(
		!isLoop ? swiper.isEnd : false
	)

	const setSwiperReaches = React.useCallback(() => {
		setHasReachBeginning(swiper.isBeginning)
		setHasReachEnd(swiper.isEnd)
	}, [])

	React.useEffect(() => {
		if (!isLoop) {
			swiper.on('slideChange', setSwiperReaches)
			swiper.on('reachBeginning', setSwiperReaches)
			swiper.on('reachEnd', setSwiperReaches)

			return () => {
				swiper.off('slideChange', setSwiperReaches)
				swiper.off('reachBeginning', setSwiperReaches)
				swiper.off('reachEnd', setSwiperReaches)
			}
		}
	}, [swiper])

	return (
		<div className={clsx(styles.navigation, { [styles.hint]: asHint })}>
			<button
				aria-label='Предыдущий слайд'
				className={clsx(styles.button, styles.prev)}
				onClick={() => swiper.slidePrev()}
				disabled={hasReachBeginning}
			>
				<ChevronLeft className={styles.icon} />
			</button>
			<button
				aria-label='Следующий слайд'
				className={clsx(styles.button, styles.next)}
				onClick={() => swiper.slideNext()}
				disabled={hasReachEnd}
			>
				<ChevronRight className={styles.icon} />
			</button>
		</div>
	)
}
