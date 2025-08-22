'use client'

import React from 'react'
import Link from 'next/link'

import { useModal } from '@/hooks/useModal'
import { FiltersRecursiveItem } from './filters-recursive-item'

import type { FilterItemType } from '../filters.data'

import styles from './filters-group.module.scss'

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
		<div className={styles.container}>
			<span className={styles.title}>{title}</span>
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
		</div>
	)
}
