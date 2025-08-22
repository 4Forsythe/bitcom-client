'use client'

import React from 'react'

import { Carousel } from '../Carousel'
import { DiscountSlide } from '../DiscountSlide'

import { useDiscounts } from '@/hooks/useDiscounts'

import styles from './discount-slider.module.scss'

export const DiscountSlider: React.FC = () => {
	const { discounts, isDiscountsLoading, isDiscountsSuccess } = useDiscounts()

	if (isDiscountsSuccess && (!discounts || !discounts.items.length)) {
		return null
	}

	return (
		<div className={styles.container}>
			<Carousel
				slides={
					isDiscountsLoading
						? [...new Array(4)].map((_, index) => (
								<div
									key={index}
									className='w-full h-[206px] bg-gray-200 rounded-lg animate-pulse'
								/>
							))
						: discounts && discounts.items.length > 0
							? discounts.items.map((item) => (
									<DiscountSlide
										key={item.id}
										{...item}
									/>
								))
							: []
				}
				slidesPerView={4}
				spaceBetween={8}
				navigation
				navigationAsHints
				breakpoints={{
					1068: {
						slidesPerView: 4
					},
					768: {
						slidesPerView: 3
					},
					520: {
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
