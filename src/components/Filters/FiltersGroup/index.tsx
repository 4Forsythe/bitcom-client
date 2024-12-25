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

interface IFiltersGroup {
	path: string
	title: string
	items: FilterItemType[]
	limit?: number
	showmoreHref: string
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

	const pathname = usePathname()
	const searchParams = useSearchParams()

	const checkTargetItem = (id: string) => {
		if (path.includes('?')) {
			const key = path.split('?')[1].split('=')[0]
			const value = searchParams.get(key)

			return value === id
		}

		return pathname.includes(path + id)
	}

	const handleClick = () => {
		if (isOpen) onClose()
	}

	const list = items.length > limit ? items.slice(0, limit) : items

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
						<Link
							key={item.id}
							className={clsx(styles.item, {
								[styles.target]: checkTargetItem(item.id)
							})}
							href={path + item.id}
							onClick={handleClick}
						>
							{formatCase(item.name)}
						</Link>
					))}
					{items.length > limit && (
						<div className={styles.showmore}>
							<Link href={showmoreHref}>Показать больше</Link>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
