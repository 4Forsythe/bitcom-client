'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { formatCase } from '@/utils/format-case'

import type { FilterItemType } from '@/components/Filters/filters.data'

import styles from './filters-group.module.scss'

interface Props {
	path: string
	item: FilterItemType
	nesting: number
	onClick: () => void
}

export const FiltersRecursiveItem: React.FC<Props> = ({
	path,
	item,
	nesting,
	onClick
}) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const checkTargetItem = (id: string) => {
		if (path.includes('?')) {
			const key = path.split('?')[1].split('=')[0]
			const value = searchParams.get(key)

			return value === id
		}

		return decodeURIComponent(pathname).includes(path + id)
	}

	return (
		<React.Fragment>
			<Link
				className={clsx({
					[styles.item]: !nesting,
					[styles.nestedItem]: nesting,
					[styles.target]: checkTargetItem(item.id)
				})}
				style={{ paddingLeft: `${nesting ? nesting * 16 : 16}px` }}
				href={path + item.id}
				onClick={onClick}
			>
				{nesting > 0 && <ChevronRight className={styles.icon} />}
				{formatCase(item.name)}
			</Link>

			{item.children &&
				item.children.length > 0 &&
				item.children.map((child) => (
					<FiltersRecursiveItem
						key={child.id}
						path={path}
						item={child}
						nesting={nesting + 1}
						onClick={onClick}
					/>
				))}
		</React.Fragment>
	)
}
