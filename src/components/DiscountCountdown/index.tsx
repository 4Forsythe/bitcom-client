'use client'

import React from 'react'
import clsx from 'clsx'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

import styles from './discount-countdown.module.scss'

interface Props {
	expiresAt: Date
	className?: string
}

export const DiscountCountdown: React.FC<Props> = ({
	className,
	expiresAt
}) => {
	const getTimeLeft = (date: Date) => {
		const ms = date.getTime() - Date.now()

		if (ms <= 0) return { days: 0, hours: 0, minutes: 0 }

		const seconds = Math.floor(ms / 1000)
		const days = Math.floor(seconds / (3600 * 24))
		const hours = Math.floor((seconds % (3600 * 24)) / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)

		return { days, hours, minutes }
	}

	const [timeLeft, setTimeLeft] = React.useState(getTimeLeft(expiresAt))

	React.useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft(getTimeLeft(expiresAt))
		}, 60000)

		return () => clearInterval(interval)
	}, [expiresAt])

	return (
		<div className={clsx(styles.container, className)}>
			<span className={styles.title}>Акция закончится через</span>
			<div className={styles.timer}>
				<div className={styles.count}>
					<span className={styles.time}>{timeLeft.days}</span>
					<span className={styles.unit}>
						{
							calcNounDeclension(timeLeft.days, 'день', 'дня', 'дней').split(
								' '
							)[1]
						}
					</span>
				</div>
				<div className={styles.count}>
					<span className={styles.time}>{timeLeft.hours}</span>
					<span className={styles.unit}>
						{
							calcNounDeclension(timeLeft.hours, 'час', 'часа', 'часов').split(
								' '
							)[1]
						}
					</span>
				</div>
				<div className={styles.count}>
					<span className={styles.time}>{timeLeft.minutes}</span>
					<span className={styles.unit}>
						{
							calcNounDeclension(
								timeLeft.minutes,
								'минута',
								'минуты',
								'минут'
							).split(' ')[1]
						}
					</span>
				</div>
			</div>
		</div>
	)
}
