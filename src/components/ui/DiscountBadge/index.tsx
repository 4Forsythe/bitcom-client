import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ROUTE } from '@/config/routes.config'
import { calcTimeBetweenDates } from '@/utils/calc-time-between-dates'

import styles from './discount-badge.module.scss'

interface Props {
	discountId: string
	iconUrl?: string
	title?: string
	expiredAt: string
}

export const DiscountBadge: React.FC<Props> = ({
	discountId,
	iconUrl,
	title,
	expiredAt
}) => {
	return (
		<Link
			className={styles.container}
			href={`${ROUTE.DISCOUNTS}/${discountId}`}
		>
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
		</Link>
	)
}
