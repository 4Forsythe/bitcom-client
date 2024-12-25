import React from 'react'
import Link from 'next/link'

import { cn } from '@/utils'

import styles from './breadcrumb.module.scss'

type BreadcrumbItem = {
	href: string
	value: string
}

interface IBreadcrumb {
	items: BreadcrumbItem[]
	value: string
}

export const Breadcrumb: React.FC<IBreadcrumb> = ({ items, value }) => {
	return (
		<div className={styles.container}>
			<ul className={styles.items}>
				{items.map((item, index) => (
					<li
						key={index}
						className={cn(styles.item)}
					>
						<Link href={item.href}>{item.value}</Link>

						<span className={styles.divider}>/</span>
					</li>
				))}

				<li className={cn(styles.item, styles.target)}>{value}</li>
			</ul>
		</div>
	)
}
