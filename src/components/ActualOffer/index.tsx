import React from 'react'
import Link from 'next/link'

import clsx from 'clsx'
import { ROUTE } from '@/config/routes.config'

import type { ProductCharacteristicType } from '@/types/product.types'

import styles from './actual-offer.module.scss'

interface Props {
	items: ProductCharacteristicType[]
	className?: string
}

export const ActualOffer: React.FC<Props> = ({ items, className }) => {
	return (
		<article className={clsx(styles.container, className)}>
			<ul className={styles.list}>
				{items.slice(0, 5).map((item) => (
					<li
						key={item.id}
						className={styles.listItem}
					>
						<Link href={`${ROUTE.SEARCH}?device=${item.id}`}>{item.name}</Link>
					</li>
				))}
			</ul>
		</article>
	)
}
