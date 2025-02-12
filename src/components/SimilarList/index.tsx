'use client'

import React from 'react'
import Link from 'next/link'

import { ROUTE } from '@/config/routes.config'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { Button, Carousel, ProductGroupItem } from '@/components'

import type { ProductsType } from '@/types/product.types'

import styles from './similar-list.module.scss'

interface ISimilarList extends ProductsType {
	categoryId?: string
}

export const SimilarList: React.FC<ISimilarList> = ({
	items,
	count,
	categoryId
}) => {
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true)
		}
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1 className={styles.title}>Смотреть похожее</h1>
				<span className={styles.count}>{count}</span>
			</div>
			{!isMounted ? (
				<div className='w-full h-[220px] flex items-center justify-center bg-gray-600/10 animate-pulse rounded-xl shadow-sm'>
					<Loader2
						className='opacity-35 animate-spin'
						size={32}
					/>
				</div>
			) : (
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
						breakpoints={{
							1160: {
								slidesPerView: 4
							},
							768: {
								slidesPerView: 3
							},
							320: {
								slidesPerView: 2
							},
							0: {
								slidesPerView: 1
							}
						}}
					/>
				</div>
			)}

			{isMounted && categoryId && (
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
