'use client'

import React from 'react'
import Link from 'next/link'

import styles from './prices.module.scss'

interface IPrices {
	items: string[]
}

export const Prices: React.FC<IPrices> = ({ items }) => {
	const [prices, setPrices] = React.useState(items)

	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<h5 className={styles.title}>Наши прайс-листы</h5>
				<div className={styles.list}>
					{prices.map((file, index) => (
						<Link
							key={index}
							className={styles.chip}
							href={'/assets/prices/' + file}
							target='_blank'
						>
							{file}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
