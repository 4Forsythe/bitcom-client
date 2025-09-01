'use client'

import React from 'react'

import {
	Badge,
	BackToTop,
	EmptyBlock,
	ProductArchiveListItem,
	ArchiveListItemSkeleton,
	SmallSearchBar,
	FlatCategoryFilter
} from '@/components'

import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import { useProductCategories } from '@/hooks/useProductCategories'

import styles from './product-archive-list.module.scss'

type TabType = {
	name: string
	property: string
}

const TABS: TabType[] = [
	{
		name: 'На продаже',
		property: 'public'
	},
	{
		name: 'В архиве',
		property: 'archive'
	},
	{
		name: 'Черновики',
		property: 'unpublished'
	}
]

export const ProductArchiveList: React.FC = () => {
	const isFetched = React.useRef(false)

	const [tab, setTab] = React.useState(TABS[0])
	const [search, setSearch] = React.useState('')
	const [targetCategory, setTargetCategory] = React.useState<string | null>(
		null
	)

	const { productCategories, isProductCategoriesLoading } =
		useProductCategories(undefined, { params: { flat: true } })

	const {
		products,
		isProductsLoading,
		isProductsSuccess,
		intersectionRef,
		refetch
	} = useInfiniteProducts(
		tab.property === 'unpublished'
			? 'unpublished'
			: tab.property === 'archive'
				? 'archive'
				: 'all'
	)

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
							placeholder='Поиск по названию...'
							onFetch={(query) => setSearch(query)}
						/>
						<div className={styles.sortTabs}>
							{TABS.map((item) => (
								<Badge
									key={item.property}
									variant={tab === item ? 'contained' : 'outlined'}
									onClick={() => setTab(item)}
								>
									{item.name}
								</Badge>
							))}
						</div>
					</div>
					<FlatCategoryFilter
						selected={targetCategory}
						onSelect={(id) => setTargetCategory(id)}
					/>
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
									<ProductArchiveListItem {...item} />
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
