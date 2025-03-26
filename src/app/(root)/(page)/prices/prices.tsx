'use client'

import React from 'react'
import Link from 'next/link'

import { File } from 'lucide-react'

import styles from './prices.module.scss'

interface Props {
	items: string[]
}

export const Prices: React.FC<Props> = ({ items }) => {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<h5 className={styles.title}>Скачать прайс-листы</h5>
				<div className={styles.list}>
					{items.map((file, index) => (
						<Link
							key={index}
							className={styles.chip}
							href={`/assets/prices/${file}`}
							target='_blank'
						>
							<div className={styles.icon}>
								<File size={16} />
							</div>
							{file}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
