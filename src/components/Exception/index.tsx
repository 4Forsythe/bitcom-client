import React from 'react'

import styles from './exception.module.scss'

interface ExceptionProps {
	children?: string
	reset: () => void
}

export const Exception: React.FC<ExceptionProps> = ({ children, reset }) => {
	return (
		<div className={styles.container}>
			<span className={styles.emoji}>¯\_(ツ)_/¯</span>
			<span className={styles.super}>Ой, кажется, что-то пошло не так</span>
			<p className={styles.error}>{children}</p>
			<div className={styles.controls}>
				<button
					className={styles.button}
					onClick={reset}
				>
					Попробовать снова
				</button>
			</div>
		</div>
	)
}
