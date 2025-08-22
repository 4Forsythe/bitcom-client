'use client'

import React from 'react'
import clsx from 'clsx'
import { X } from 'lucide-react'

import {
	BackToTop,
	EmptyBlock,
	ArchiveListItem,
	ArchiveListItemSkeleton,
	SmallSearchBar,
	Button
} from '@/components'
import { API_BASE_URL } from '@/constants'

import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import { useProductCategories } from '@/hooks/useProductCategories'

import styles from './archive-list.module.scss'
import toast from 'react-hot-toast'

export const ArchiveList: React.FC = () => {
	const isFetched = React.useRef(false)

	const [isFileProcessing, setIsFileProcessing] = React.useState(false)
	const [search, setSearch] = React.useState('')
	const [targetCategory, setTargetCategory] = React.useState<string | null>(
		null
	)

	const handleDownloadFile = async () => {
		setIsFileProcessing(true)

		try {
			window.open(`${API_BASE_URL}/product/export`, '_blank')
		} catch (error) {
			console.error('ArchiveList: handleDownloadFile', error)
			toast.error('Возникла ошибка при экспорте в Excel')
		} finally {
			setIsFileProcessing(false)
		}
	}

	const { productCategories, isProductCategoriesLoading } =
		useProductCategories(undefined, { flat: true })

	const {
		products,
		isProductsLoading,
		isProductsSuccess,
		intersectionRef,
		refetch
	} = useInfiniteProducts('archive')

	const flatProducts = products
		? products.pages.flatMap((item) => item.items)
		: []

	React.useEffect(() => {
		if (products && isProductsSuccess && !isFetched.current) {
			isFetched.current = true
		}

		if (products && isProductsSuccess && isFetched.current) {
			refetch({ search, categoryId: targetCategory || '' })
		}

		if (search.trim()) {
			refetch({ search, categoryId: targetCategory || '' })
		}
	}, [products, productCategories, search, targetCategory])

	return (
		<div className={styles.container}>
			{isFetched && (
				<div className={styles.topbar}>
					<div className={styles.topbarMenu}>
						<SmallSearchBar
							className={styles.searchbar}
							placeholder='Поиск позиции...'
							onFetch={(query) => setSearch(query)}
						/>
						<Button
							className={styles.exportLink}
							onClick={handleDownloadFile}
							isLoading={isFileProcessing}
						>
							{isFileProcessing ? 'Генерируем файл...' : 'Экспорт в Excel'}
						</Button>
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
						flatProducts.length > 0 &&
						flatProducts.map((item, index) => {
							const isLast = index === flatProducts.length - 1

							return (
								<React.Fragment key={item.id}>
									<ArchiveListItem {...item} />
									{isLast && <div ref={intersectionRef} />}
								</React.Fragment>
							)
						})}
			</div>

			{!isProductsLoading && !(products && flatProducts.length > 0) && (
				<EmptyBlock
					title='Архив пуст'
					description='В этом разделе будут находиться архивированные и неопубликованные товары'
				/>
			)}

			<BackToTop />
		</div>
	)
}
