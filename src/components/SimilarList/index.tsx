'use client'

import React from 'react'

import { Button, Carousel, ProductGroupItem } from '@/components'

import type { ProductsType } from '@/types/product.types'

import styles from './similar-list.module.scss'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { ROUTE } from '@/config/routes.config'

interface ISimilarList extends ProductsType {
	categoryId?: string
}

export const SimilarList: React.FC<ISimilarList> = ({
	items,
	count,
	categoryId
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1 className={styles.title}>Смотреть похожее</h1>
				<span className={styles.count}>{count}</span>
			</div>
			<div className={styles.list}>
				<Carousel
					slides={items.map((item) => (
						<ProductGroupItem
							key={item.id}
							{...item}
						/>
					))}
					spaceBetween={14}
					slidesPerView={4}
					navigation
					loop
				/>
			</div>
			{categoryId && (
				<Link href={`${ROUTE.CATALOG}/${categoryId}`}>
					<Button
						className={styles.button}
						variant='transparent'
					>
						Показать все
						<ArrowUpRight size={18} />
					</Button>
				</Link>
			)}
		</div>
	)
}
