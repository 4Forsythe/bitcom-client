'use client'

import React from 'react'

import clsx from 'clsx'
import Cookies from 'js-cookie'
import { Cookie, X } from 'lucide-react'

import { Button } from '@/components'

import styles from './allow-cookies.module.scss'

export const AllowCookies: React.FC = () => {
	const [isAllow, setIsAllow] = React.useState(true)

	console.log(window.location.hostname)

	React.useEffect(() => {
		const delay = setTimeout(() => {
			const cookie = Cookies.get('allow-cookies')

			if (!cookie) setIsAllow(false)

			if (cookie) {
				Cookies.set('allow-cookies', 'access', {
					domain: window.location.hostname,
					sameSite: 'lax',
					expires: 30
				})
			}
		}, 3000)

		return () => clearTimeout(delay)
	}, [])

	const onHide = () => {
		setIsAllow(true)
		Cookies.set('allow-cookies', 'access', {
			domain: window.location.hostname,
			sameSite: 'lax',
			expires: 30
		})
	}

	if (isAllow) return null

	return (
		<div className={styles.wrapper}>
			<div className={clsx(styles.container, 'animate-opacity')}>
				<div className={styles.inner}>
					<div className={styles.head}>
						<Cookie size={22} />
						<h5 className={styles.title}>Мы используем куки</h5>
					</div>

					<p className={styles.text}>
						Для повышения качества сервисов мы сохраняем некоторые cookie-файлы
						в браузере
					</p>
				</div>

				<Button
					className={styles.allow}
					size='sm'
					onClick={onHide}
					aria-label='Принять'
				>
					Хорошо
				</Button>
				<button
					className={styles.close}
					onClick={onHide}
					aria-label='Скрыть'
				>
					<X size={18} />
				</button>
			</div>
		</div>
	)
}
