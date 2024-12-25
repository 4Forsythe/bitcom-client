'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

import { POST_SORTS, type SortType } from './sorts.data'

import styles from './sort-bar.module.scss'

export const PostSortBar: React.FC = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const initializeSorts = (sorts: SortType[]) => {
		return (
			sorts.find(
				(sort) =>
					sort.property === searchParams.get('sortBy') &&
					sort.order === searchParams.get('orderBy')
			) || sorts[0]
		)
	}

	const [isDropdown, setIsDropdown] = React.useState(false)
	const dropdownRef = React.useRef<HTMLDivElement>(null)

	const [sort, setSort] = React.useState<SortType>(initializeSorts(POST_SORTS))

	React.useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdown(false)
			}
		}

		document.body.addEventListener('click', handleClick)

		return () => {
			document.body.removeEventListener('click', handleClick)
		}
	}, [])

	const onSortChange = (sort: SortType) => {
		setSort(sort)

		const params = new URLSearchParams(searchParams.toString())
		params.set('sortBy', sort.property)
		params.set('orderBy', sort.order)

		router.push(`?${params.toString()}`)

		setIsDropdown(false)
	}

	return (
		<div
			className={styles.container}
			ref={dropdownRef}
		>
			<ul className={styles.list}>
				<li className={styles.item}>
					<span className={styles.label}>Сортировка:</span>
					<button
						className={styles.drop}
						onClick={() => setIsDropdown(!isDropdown)}
					>
						{sort.name}
						<ChevronDown
							className={clsx(styles.icon, { [styles.droped]: isDropdown })}
						/>
					</button>
				</li>
				{isDropdown && (
					<div className={styles.dropdown}>
						<ul className={styles.menu}>
							{POST_SORTS.map((item, index) => (
								<li
									key={index}
									className={styles.item}
								>
									<button
										className={clsx(styles.select, {
											[styles.target]: item === sort
										})}
										onClick={() => onSortChange(item)}
									>
										{item.name}
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</ul>
		</div>
	)
}
