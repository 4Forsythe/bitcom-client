'use server'

import React from 'react'
import Link from 'next/link'

import { DynamicImage } from '@/components/dynamic-image'

import { ROUTE } from '@/config/routes.config'
import { formatCase } from '@/utils/format-case'

import type { ProductCharacteristicsType } from '@/types/product.types'

import styles from './catalog.module.scss'
import Image from 'next/image'

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
							className={styles.image}
							width={170}
							height={120}
							src={`/static/${category.imageUrl}`}
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
