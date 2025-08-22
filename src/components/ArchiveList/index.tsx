'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { X } from 'lucide-react'

import {
	BackToTop,
	Pagination,
	EmptyBlock,
	ArchiveListItem,
	ArchiveListItemSkeleton,
	SmallSearchBar,
	Button
} from '@/components'
import { API_BASE_URL } from '@/constants'

import { useArchive } from '@/hooks/useArchive'
import { useProductCategories } from '@/hooks/useProductCategories'

import styles from './archive-list.module.scss'

export const ArchiveList: React.FC = () => {
	const isFetched = React.useRef(false)
	const [targetCategory, setTargetCategory] = React.useState<string | null>(
		null
	)

	const { productCategories, isProductCategoriesLoading } =
		useProductCategories(undefined, { flat: true })

	const { products, isProductsLoading, isProductsSuccess, refetch } =
		useArchive()

	React.useEffect(() => {
		if (products && isProductsSuccess && !isFetched.current) {
			isFetched.current = true
		}

		if (products && isProductsSuccess && isFetched.current) {
			refetch({ categoryId: targetCategory || '' })
		}
	}, [products, productCategories, targetCategory])

	return (
		<div className={styles.container}>
			{isFetched && (
				<div className={styles.topbar}>
					<div className={styles.topbarMenu}>
						<SmallSearchBar
							className={styles.searchbar}
							placeholder='Поиск позиции...'
							onFetch={(query) => refetch({ search: query })}
						/>
						<Link
							className={styles.exportLink}
							href={`${API_BASE_URL}/product/export`}
							target='_blank'
							download
						>
							Экспорт в Excel
						</Link>
					</div>
					{isProductCategoriesLoading ? (
						<div className='w-full h-[40px] flex bg-gray-200 rounded-3xl animate-pulse' />
					) : (
						productCategories &&
						productCategories.items.length > 0 && (
							<ul className={styles.categories}>
								{productCategories.items.map((category) => (
									<li
										key={category.id}
										className={clsx(styles.categoryItem, {
											[styles.active]: targetCategory === category.id
										})}
									>
										<button
											className={styles.categoryButton}
											onClick={() => setTargetCategory(category.id)}
										>
											{category.name}
										</button>
										{targetCategory === category.id && (
											<button
												className={clsx(styles.categoryIcon, 'animate-opacity')}
												onClick={() => setTargetCategory(null)}
											>
												<X
													className={styles.icon}
													size={16}
												/>
											</button>
										)}
									</li>
								))}
							</ul>
						)
					)}
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
