'use client'

import React from 'react'

import clsx from 'clsx'
import { useSwiper } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './product-image-gallery.module.scss'

interface Props {
	asHint?: boolean
	isLoop?: boolean
}

export const ProductImageGalleryNavigation: React.FC<Props> = ({
	asHint,
	isLoop
}) => {
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
				aria-label='Предыдущая картинка'
				className={clsx(styles.button, styles.prev)}
				onClick={() => swiper.slidePrev()}
				disabled={hasReachBeginning}
			>
				<ChevronLeft
					className={styles.icon}
					size={48}
				/>
			</button>
			<button
				aria-label='Следующая картинка'
				className={clsx(styles.button, styles.next)}
				onClick={() => swiper.slideNext()}
				disabled={hasReachEnd}
			>
				<ChevronRight
					className={styles.icon}
					size={48}
				/>
			</button>
		</div>
	)
}
