'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import clsx from 'clsx'
import {
	ChevronLeft,
	ChevronsLeft,
	ChevronRight,
	ChevronsRight
} from 'lucide-react'

import { Skeleton } from './Skeleton'

import styles from './Pagination.module.scss'

interface PaginationProps {
	total: number
	align?: 'left' | 'center' | 'right'
}

export const Pagination = ({ total, align = 'center' }: PaginationProps) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	// if (total === undefined) {
	// 	return <Skeleton />
	// }

	const page = Number(searchParams.get('page')) || 1
	const limit = Number(searchParams.get('limit')) || 10

	const pages = Math.ceil(total / limit)
	const pageNumbers = []

	if (pages < 2) {
		return null
	}

	for (let i = page - limit; i <= page + limit; i++) {
		if (i >= 1 && i <= pages) {
			pageNumbers.push(i)
		}
	}

	const onPageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('page', page.toString())
		params.set('limit', limit.toString())
		router.push(`?${params.toString()}`)
	}

	return (
		<div
			className={styles.container}
			style={{ justifyContent: align }}
		>
			<ul className={styles.bar}>
				{!pageNumbers.includes(1) && (
					<li className={styles.tile}>
						<button
							className={styles.page}
							onClick={() => onPageChange(1)}
						>
							<ChevronsLeft />
						</button>
					</li>
				)}
				<li className={styles.tile}>
					<button
						className={styles.page}
						onClick={() => onPageChange(page - 1)}
						disabled={page <= 1}
					>
						<ChevronLeft />
					</button>
				</li>
				{pageNumbers.map((number, index) => (
					<li
						key={index}
						className={styles.tile}
					>
						<button
							className={clsx(styles.page, {
								[styles.target]: number === page
							})}
							onClick={() => onPageChange(number)}
						>
							{number}
						</button>
					</li>
				))}
				<li className={styles.tile}>
					<button
						className={styles.page}
						onClick={() => onPageChange(page + 1)}
						disabled={page === pages}
					>
						<ChevronRight />
					</button>
				</li>
				{!pageNumbers.includes(pages) && (
					<li className={styles.tile}>
						<button
							className={styles.page}
							onClick={() => onPageChange(pages)}
						>
							<ChevronsRight />
						</button>
					</li>
				)}
			</ul>
		</div>
	)
}
