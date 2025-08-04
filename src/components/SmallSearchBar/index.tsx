'use client'

import React from 'react'
import clsx from 'clsx'
import { Search, X } from 'lucide-react'

import { useDebounce } from '@/hooks/useDebounce'

import styles from './small-search-bar.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	onFetch: (query: string) => void
}

export const SmallSearchBar: React.FC<Props> = ({
	placeholder,
	className,
	onFetch,
	...rest
}) => {
	const [value, setValue] = React.useState('')
	const inputRef = React.useRef<HTMLInputElement>(null)

	const { query } = useDebounce({ value, delay: 300 })

	const onClear = React.useCallback(() => {
		setValue('')
		onFetch('')
		inputRef.current?.focus()
	}, [onFetch])

	React.useEffect(() => {
		if (query) {
			onFetch(query)
		}
	}, [query])

	return (
		<div className={clsx(styles.container, className)}>
			<input
				ref={inputRef}
				className={styles.form}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				type='text'
				placeholder={placeholder || 'Поиск'}
				spellCheck={false}
				{...rest}
			/>
			{value ? (
				<button
					aria-label='Очистить'
					onClick={onClear}
				>
					<X className={styles.icon} />
				</button>
			) : (
				<Search className={styles.icon} />
			)}
		</div>
	)
}
