import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Badge, Carousel, HomeWidget } from '@/components'

import { SOCIALS } from './socials.data'
import { SLIDES } from '../Carousel/carousel.data'
import { EMAIL, PHONE } from '@/constants/contacts.constants'
import { MARKETPLACES } from '@/constants/marketplaces.constants'

import styles from './news.module.scss'

export const News: React.FC = () => {
	return (
		<section className={styles.container}>
			<div className={styles.inner}>
				<Carousel
					slides={SLIDES.map((slide) => (
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
					slidesPerView={1}
					autoplay={5000}
					navigation
					loop
				/>
				<div className={styles.column}>
					<HomeWidget title='Полезные ссылки'>
						<div className={styles.socials}>
							<Badge
								className={styles.item}
								href={`tel:${PHONE}`}
								variant='outlined'
							>
								<Image
									className={styles.icon}
									width={64}
									height={64}
									src='/icons/Phone.svg'
									alt='Телефон'
									priority
								/>
							</Badge>
							<Badge
								className={styles.item}
								href={`mailto:${EMAIL}`}
								variant='outlined'
							>
								<Image
									className={styles.icon}
									width={64}
									height={64}
									src='/icons/Mail.svg'
									alt='Почта'
									priority
								/>
							</Badge>
							{SOCIALS.map((item) => (
								<Link
									className={styles.item}
									key={item.href}
									href={item.href}
									target='_blank'
								>
									<Image
										className={styles.icon}
										width={64}
										height={64}
										src={item.imageUrl}
										alt={item.tag}
										priority
									/>
								</Link>
							))}
						</div>
					</HomeWidget>
					<HomeWidget title='Маркетплейсы'>
						<div className={styles.marketplaces}>
							{MARKETPLACES.map((item) => (
								<Badge
									className={styles.item}
									key={item.id}
									href={item.href}
									variant='outlined'
								>
									<Image
										className={styles.icon}
										width={64}
										height={64}
										src={item.imageUrl}
										alt={item.id}
										priority
									/>
								</Badge>
							))}
						</div>
					</HomeWidget>
				</div>
			</div>
		</section>
	)
}
