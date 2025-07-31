import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './telegram-banner.module.scss'

export const TelegramBanner: React.FC = () => {
	return (
		<Link
			className={styles.container}
			href={process.env.NEXT_PUBLIC_TELEGRAM_URL as string}
			target='_blank'
		>
			<Image
				src='/icons/TelegramColored.svg'
				width={36}
				height={36}
				alt='БитКом'
				priority
			/>
			<div className={styles.content}>
				<p className={styles.heading}>Переходите в наш Telegram</p>
				<span className={styles.description}>
					Мы регулярно постим выгодные предложения
				</span>
			</div>
		</Link>
	)
}
