import React from 'react'

import styles from './CooldownTimer.module.scss'

interface CooldownTimerProps {
	seconds: number
	onEnd: () => void
}

export const CooldownTimer = ({ seconds, onEnd }: CooldownTimerProps) => {
	const [time, setTime] = React.useState(seconds)

	React.useEffect(() => {
		if (time <= 0) {
			onEnd()
			return
		}

		const interval = setInterval(() => {
			setTime((prev) => prev - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [time, onEnd])

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60

		return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
	}

	return (
		<div className={styles.container}>
			<span className={styles.counter}>{formatTime(time)}</span>
		</div>
	)
}
