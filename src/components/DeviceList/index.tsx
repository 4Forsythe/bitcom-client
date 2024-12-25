'use client'

import Link from 'next/link'

import { ROUTE } from '@/config/routes.config'

import type {
	ProductCharacteristicType,
	ProductCharacteristicsType
} from '@/types/product.types'

import styles from './device-list.module.scss'

export const DeviceList: React.FC<ProductCharacteristicsType> = ({ items }) => {
	const onChunkArray = (
		array: ProductCharacteristicType[],
		itemsPerGroup: number
	) => {
		let items = []

		for (let i = 0; i < array.length; i += itemsPerGroup) {
			items.push(array.slice(i, i + itemsPerGroup))
		}

		return items
	}

	const devices = onChunkArray(items, 10)

	return (
		<div className={styles.wrap}>
			<div className={styles.container}>
				{devices.map((group, index) => (
					<ul
						className={styles.group}
						key={index}
					>
						{group.map((item) => (
							<li
								className={styles.item}
								key={item.id}
							>
								<Link
									className={styles.link}
									href={`${ROUTE.SEARCH}?device=${item.id}`}
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	)
}
