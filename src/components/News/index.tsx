'use server'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { NEWS_SLIDES } from './slides.data'
import { Badge, Carousel, HomeWidget } from '@/components'

import { SOCIALS } from './socials.data'
import { EMAIL } from '@/constants/contacts.constants'
import { MARKETPLACES } from '@/constants/marketplaces.constants'

import styles from './news.module.scss'

export const News: React.FC = async () => {
	return (
		<section className={styles.container}>
			<div className={styles.inner}>
				<div className={styles.slider}>
					<Carousel
						slides={NEWS_SLIDES.map((slide) => (
							<div className={styles.cover}>
								<Image
									className={styles.image}
									width={1000}
									height={500}
									src={slide.imageUrl}
									blurDataURL={
										slide.imageUrl || '/static/image-placeholder.png'
									}
									placeholder='blur'
									alt={`Баннер: ${slide.tag}`}
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
				</div>

				<div className={styles.column}>
					<HomeWidget title='Контакты'>
						<div className={styles.socials}>
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
