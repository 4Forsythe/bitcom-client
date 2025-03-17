import React from 'react'
import Link from 'next/link'

import { File } from 'lucide-react'

import styles from './prices.module.scss'

type IPriceItem = {
	href: string
	name: string
}

interface IPrices {
	items: IPriceItem[]
}

export const Prices: React.FC<IPrices> = ({ items }) => {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<h5 className={styles.title}>Скачать прайс-листы</h5>
				<div className={styles.list}>
					{items.map((file, index) => (
						<Link
							key={index}
							className={styles.chip}
							href={file.href}
							target='_blank'
						>
							<div className={styles.icon}>
								<File size={16} />
							</div>
							{file.name}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
