'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { Search, X, ArrowUpRight } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'
import { useDebounce } from '@/hooks/useDebounce'

import { productService } from '@/services/product.service'

import styles from './search-bar.module.scss'

interface ISearchBarProps {
	variant?: 'contained' | 'outlined'
}

export const SearchBar: React.FC<ISearchBarProps> = ({
	variant = 'outlined'
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [value, setValue] = React.useState('')
	const [target, setTarget] = React.useState(0)

	const [isHovered, setIsHovered] = React.useState(false)
	const [isFocused, setIsFocused] = React.useState(false)

	const containerRef = React.useRef<HTMLDivElement>(null)
	const inputRef = React.useRef<HTMLInputElement>(null)
	const presearchRef = React.useRef<HTMLDivElement>(null)

	const { query } = useDebounce({ value, delay: 700 })

	const { data } = useQuery({
		queryKey: ['search', query],
		queryFn: () => productService.getAll({ name: value, take: 10 }),
		enabled: !!query
	})

	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		switch (event.key) {
			case 'ArrowUp':
				event.preventDefault()
				setTarget((prev) =>
					prev > 1 ? prev - 1 : data ? data.items.length : -1
				)
				break
			case 'ArrowDown':
				event.preventDefault()
				setTarget((prev) =>
					prev > (data ? data.items.length - 1 : 1) ? 1 : prev + 1
				)
				break
			case 'Enter':
				event.preventDefault()
				onSearch()
				break
			case 'Escape':
				event.preventDefault()
				if (value.trim()) {
					onClear()
				} else {
					inputRef.current?.blur()
					setIsFocused(false)
				}
				break
			default:
				setTarget(0)
				break
		}
	}

	const onSearch = () => {
		if (!value.trim() && target < 1) {
			inputRef.current?.blur()
			setIsFocused(false)
		}

		if (!(target > 0) && value.trim()) {
			const params = new URLSearchParams(searchParams.toString())
			params.set('q', value)
			router.push(`${ROUTE.SEARCH}?${params.toString()}`)
			inputRef.current?.blur()
		}

		if (target > 0 && data?.items[target]) {
			router.push(`${ROUTE.PRODUCT}/${data.items[target].slug}`)
			inputRef.current?.blur()
		}

		setIsFocused(false)
	}

	const onClear = () => {
		setValue('')
		inputRef.current?.focus()
	}

	const onMouseEnter = () => {
		containerRef.current && setIsHovered(true)
	}

	const onMouseLeave = () => {
		containerRef.current && setIsHovered(false)
	}

	const handleClickOutside = React.useCallback((event: MouseEvent) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(event.target as Node)
		) {
			setIsFocused(false)
		}
	}, [])

	React.useEffect(() => {
		document.body.addEventListener('click', handleClickOutside)

		return () => {
			document.body.removeEventListener('click', handleClickOutside)
		}
	}, [handleClickOutside])

	return (
		<>
			{isFocused && <div className={styles.overlay} />}
			<div
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.contained]: variant === 'contained',
					[styles.outlined]: variant === 'outlined',
					[styles.focused]: isFocused || isHovered
				})}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<input
					ref={inputRef}
					className={styles.form}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={onKeyDown}
					onFocus={() => setIsFocused(true)}
					type='text'
					placeholder='Поиск в магазине...'
				/>
				<div className={styles.controls}>
					{value && (
						<>
							<button
								aria-label='Очистить'
								className={styles.control}
								onClick={onClear}
							>
								<X className={styles.icon} />
							</button>
							<span className={styles.divider} />
						</>
					)}
					<button
						aria-label='Найти'
						className={styles.control}
						onClick={onSearch}
					>
						<Search className={styles.icon} />
					</button>
				</div>
				{isFocused && value && !!data?.items.length && (
					<div
						className={styles.presearch}
						ref={presearchRef}
					>
						<ul className={styles.items}>
							{data.items.map((item, index) => (
								<li key={item.id}>
									<button
										className={clsx(styles.item, {
											[styles.target]: index + 1 === target
										})}
										onClick={() => {
											router.push(`${ROUTE.PRODUCT}/${item.slug}`, {
												scroll: true
											})
											setIsFocused(false)
										}}
									>
										<Search className={styles.icon} />
										<p className={styles.title}>{item.name.toLowerCase()}</p>
										<ArrowUpRight className={styles.icon} />
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	)
}

export { SearchBarSkeleton } from './skeleton'
