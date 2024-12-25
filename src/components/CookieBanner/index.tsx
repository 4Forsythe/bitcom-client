'use client'

import React from 'react'

import clsx from 'clsx'
import { HeartHandshake, X } from 'lucide-react'

import styles from './cookie-banner.module.scss'

export const CookieBanner: React.FC = () => {
	const [isHidden, setIsHidden] = React.useState(true)

	React.useEffect(() => {
		const banner = localStorage.getItem('cookie-banner') === 'off'

		if (!banner) setIsHidden(false)
	}, [])

	const onHide = () => {
		setIsHidden(true)
		localStorage.setItem('cookie-banner', 'off')
	}

	if (isHidden) return null

	return (
		<div className={clsx(styles.container, 'animate-opacity')}>
			<div className={styles.inner}>
				<div className={styles.cover}>
					<HeartHandshake className={styles.image} />
				</div>
				<span className={styles.text}>
					Помогите нам улучшить качество сайта! Отправляйте свои предложения на
					почту <b>info@bitcom.ru</b>, и мы внимательно рассмотрим их. Это
					действительно поможет нам в развитии интернет-магазина!
				</span>
				<button
					className={styles.control}
					onClick={onHide}
				>
					<X className={styles.icon} />
				</button>
			</div>
		</div>
	)
}
