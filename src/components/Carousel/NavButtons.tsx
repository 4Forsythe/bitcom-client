'use client'

import React from 'react'

import clsx from 'clsx'
import { useSwiper } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './Carousel.module.scss'

interface NavButtonsProps {
	asHint?: boolean
}

export const NavButtons: React.FC<NavButtonsProps> = ({ asHint }) => {
	const swiper = useSwiper()

	const [hasReachBeginning, setHasReachBeginning] = React.useState(
		swiper.isBeginning
	)
	const [hasReachEnd, setHasReachEnd] = React.useState(swiper.isEnd)

	React.useEffect(() => {
		swiper.on('slideChange', () => {
			setHasReachBeginning(swiper.isBeginning)
			setHasReachEnd(swiper.isEnd)
		})

		swiper.on('reachBeginning', () => {
			setHasReachBeginning(swiper.isBeginning)
		})

		swiper.on('reachEnd', () => {
			setHasReachEnd(swiper.isEnd)
		})

		return () => {
			swiper.off('slideChange', () => {
				setHasReachBeginning(swiper.isBeginning)
				setHasReachEnd(swiper.isEnd)
			})

			swiper.off('reachBeginning', () => {
				setHasReachBeginning(swiper.isBeginning)
			})

			swiper.off('reachEnd', () => {
				setHasReachEnd(swiper.isEnd)
			})
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
