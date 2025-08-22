import React from 'react'
import Image from 'next/image'

import { calcTimeBetweenDates } from '@/utils/calc-time-between-dates'

import styles from './discount-badge.module.scss'

interface Props {
	iconUrl?: string
	title?: string
	expiredAt: string
}

export const DiscountBadge: React.FC<Props> = ({
	iconUrl,
	title,
	expiredAt
}) => {
	return (
		<div className={styles.container}>
			{iconUrl && (
				<Image
					src={iconUrl}
					className={styles.icon}
					width={24}
					height={24}
					alt='Emoji'
					priority
				/>
			)}
			<span className={styles.text}>
				{title ? title : 'Акция еще'}{' '}
				{calcTimeBetweenDates(new Date(), new Date(expiredAt))}
			</span>
		</div>
	)
}
