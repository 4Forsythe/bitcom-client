'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ROUTE } from '@/config/routes.config'

import type { ProductCategoryType } from '@/types/product-category.types'

import styles from './header-catalog.module.scss'

const flatSubcategories = (items: ProductCategoryType[]) => {
	const flat: ProductCategoryType[] = []

	const traverse = (categories: ProductCategoryType[]) => {
		for (const category of categories) {
			const { children, ...rest } = category
			flat.push({ ...rest, children: [] })

			if (children && children.length > 0) {
				traverse(children)
			}
		}
	}

	traverse(items)
	return flat
}

interface Props {
	items?: ProductCategoryType[]
	isPopup?: boolean
	isLoading?: boolean
	setIsPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export const HeaderCatalog: React.FC<Props> = ({
	items,
	isPopup,
	isLoading,
	setIsPopup
}) => {
	const pathname = usePathname()

	React.useEffect(() => {
		setIsPopup(false)
	}, [pathname])

	return (
		<div className={clsx(styles.container, { [styles.popup]: isPopup })}>
			<div className={styles.categories}>
				{isLoading
					? [...new Array(4)].map((_, index) => (
							<div
								key={index}
								className={styles.categoryColumn}
							>
								<div className='w-2/3 h-10 bg-gray-100 rounded-md animate-pulse' />
								<div className='w-full h-40 bg-gray-100 rounded-md animate-pulse' />
							</div>
						))
					: items &&
						items.length > 0 &&
						items.map((item) => (
							<div
								key={item.id}
								className={styles.categoryColumn}
							>
								<Link
									className={styles.categoryRoot}
									href={`${ROUTE.CATALOG}/${item.id}`}
								>
									{item.name}
								</Link>
								{item.children.length > 0 && (
									<div className={styles.subcategories}>
										{flatSubcategories(item.children).map((flatItem) => (
											<Link
												key={flatItem.id}
												className={styles.category}
												href={`${ROUTE.CATALOG}/${flatItem.id}`}
											>
												{flatItem.name}
											</Link>
										))}
									</div>
								)}
							</div>
						))}
			</div>
		</div>
	)
}
