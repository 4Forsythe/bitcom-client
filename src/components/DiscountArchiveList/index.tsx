'use client'

import React from 'react'

import {
	Badge,
	BackToTop,
	EmptyBlock,
	ArchiveListItemSkeleton,
	SmallSearchBar,
	DiscountCard
} from '@/components'

import { useInfiniteDiscounts } from '@/hooks/useInfiniteDiscounts'

import styles from './discount-archive-list.module.scss'

type TabType = {
	name: string
	property: string
}

const TABS: TabType[] = [
	{
		name: 'Активные',
		property: 'public'
	},
	{
		name: 'В архиве',
		property: 'archive'
	}
]

export const DiscountArchiveList: React.FC = () => {
	const isFetched = React.useRef(false)

	const [tab, setTab] = React.useState(TABS[0])
	const [search, setSearch] = React.useState('')

	const {
		discounts,
		isDiscountsLoading,
		isDiscountsSuccess,
		refetch,
		intersectionRef
	} = useInfiniteDiscounts(tab.property === 'archive' ? 'archive' : 'all')

	const flatDiscounts = discounts
		? discounts.pages.flatMap((item) => item.items)
		: []

	React.useEffect(() => {
		if (discounts && isDiscountsSuccess && !isFetched.current) {
			isFetched.current = true
		}

		if (discounts && isDiscountsSuccess && isFetched.current) {
			refetch({ search })
		}

		if (search.trim()) {
			refetch({ search })
		}
	}, [discounts, search])

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
				</div>
			)}

			<div className={styles.list}>
				{isDiscountsLoading
					? [...new Array(4)].map((_, index) => (
							<ArchiveListItemSkeleton key={index} />
						))
					: discounts &&
						flatDiscounts.length > 0 &&
						flatDiscounts.map((item, index) => {
							const isLast = index === flatDiscounts.length - 1

							return (
								<React.Fragment key={item.id}>
									<DiscountCard
										discount={item}
										hasManagerControls
									/>
									{isLast && <div ref={intersectionRef} />}
								</React.Fragment>
							)
						})}
			</div>

			{!isDiscountsLoading && !(discounts && flatDiscounts.length > 0) && (
				<EmptyBlock
					title='Архив пуст'
					description='В этом разделе будет отображаться архив ваших акций'
				/>
			)}

			<BackToTop />
		</div>
	)
}
