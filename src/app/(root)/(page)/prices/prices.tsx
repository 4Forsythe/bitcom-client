import React from 'react'
import Link from 'next/link'
import { File } from 'lucide-react'

import { InfoBlock } from '@/components'

import styles from './prices.module.scss'

const API_BASE_URL = String(process.env.API_BASE_URL)

export const Prices: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<h5 className={styles.title}>Скачать прайс-листы</h5>
				<div className={styles.list}>
					<Link
						className={styles.chip}
						href={`${API_BASE_URL}/product/export`}
						target='_blank'
					>
						<div className={styles.icon}>
							<File size={18} />
						</div>
						Все товары
					</Link>
				</div>
				<InfoBlock
					className={styles.infoBlock}
					variant='knowledge'
				>
					Данные могут обновляться с задержкой до 1 ч. реального времени.
				</InfoBlock>
			</div>
		</div>
	)
}
