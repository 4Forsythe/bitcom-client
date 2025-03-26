'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import clsx from 'clsx'
import { ChevronUp } from 'lucide-react'

import { useModal } from '@/hooks/useModal'
import { formatCase } from '@/utils/format-case'

import type { FilterItemType } from '../filters.data'

import styles from './filters-group.module.scss'
import { FiltersRecursiveItem } from './filters-recursive-item'

interface IFiltersGroup {
	path: string
	title: string
	items: FilterItemType[]
	limit?: number
	showmoreHref?: string
}

export const FiltersGroup: React.FC<IFiltersGroup> = ({
	path,
	title,
	items,
	limit = 10,
	showmoreHref
}) => {
	const [isDropdown, setIsDropdown] = React.useState(true)

	const { isOpen, onClose } = useModal()

	const handleClick = () => {
		if (isOpen) onClose()
	}

	const list =
		showmoreHref && items.length > limit ? items.slice(0, limit) : items

	return (
		<div
			className={clsx(styles.container, {
				[styles.opened]: isDropdown
			})}
		>
			<button
				className={styles.title}
				onClick={() => setIsDropdown(!isDropdown)}
			>
				<ChevronUp className={styles.icon} /> {title}
			</button>
			{isDropdown && (
				<div className={styles.items}>
					{list.map((item) => (
						<FiltersRecursiveItem
							key={item.id}
							path={path}
							item={item}
							nesting={0}
							onClick={handleClick}
						/>
					))}
					{showmoreHref && items.length > limit && (
						<div className={styles.showmore}>
							<Link href={showmoreHref}>Показать больше</Link>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
