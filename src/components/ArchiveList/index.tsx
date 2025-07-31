'use client'

import React from 'react'

import {
	BackToTop,
	Pagination,
	EmptyBlock,
	ArchiveListItem,
	ArchiveListItemSkeleton,
	SmallSearchBar
} from '@/components'

import { useProducts } from '@/hooks/useProducts'

import styles from './archive-list.module.scss'

export const ArchiveList: React.FC = () => {
	const isFetched = React.useRef(false)

	const { products, isProductsLoading, isProductsSuccess, refetch } =
		useProducts()

	React.useEffect(() => {
		if (products && isProductsSuccess && !isFetched.current) {
			isFetched.current = true
		}
	}, [products])

	return (
		<div className={styles.container}>
			{isFetched && (
				<div className={styles.topbar}>
					<SmallSearchBar
						className={styles.searchbar}
						placeholder='Поиск позиции...'
						onFetch={refetch}
					/>
				</div>
			)}

			<div className={styles.list}>
				{isProductsLoading
					? [...new Array(4)].map((_, index) => (
							<ArchiveListItemSkeleton key={index} />
						))
					: products &&
						products.items.map((item) => (
							<ArchiveListItem
								key={item.id}
								{...item}
							/>
						))}
			</div>

			{!isProductsLoading && !(products && products.items.length > 0) && (
				<EmptyBlock
					title='Архив пуст'
					description='В этом разделе будут находиться архивированные и неопубликованные товары'
				/>
			)}

			{products && products.items.length > 0 && (
				<Pagination total={products.count} />
			)}

			<BackToTop />
		</div>
	)
}
