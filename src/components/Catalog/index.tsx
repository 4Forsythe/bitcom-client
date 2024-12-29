'use server'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'

import { ROUTE } from '@/config/routes.config'
import { formatCase } from '@/utils/format-case'

import type { ProductCharacteristicsType } from '@/types/product.types'

import styles from './catalog.module.scss'

export const Catalog: React.FC<ProductCharacteristicsType> = ({ items }) => {
	return (
		<div className={styles.container}>
			{items.map((category) => (
				<Link
					key={category.id}
					href={`${ROUTE.CATALOG}/${category.id}`}
					className={styles.card}
				>
					<div className={styles.cover}>
						<Image
							className={clsx(styles.image, {
								[styles.placeholder]: !category?.imageUrl
							})}
							width={170}
							height={120}
							src={
								category.imageUrl
									? `/static/${category.imageUrl}`
									: '/static/image-placeholder.png'
							}
							alt={category.name}
							priority
						/>
					</div>
					<span className={styles.title}>{formatCase(category.name)}</span>
				</Link>
			))}
		</div>
	)
}
