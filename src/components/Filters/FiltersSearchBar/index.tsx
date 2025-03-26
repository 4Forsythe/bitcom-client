'use client'

import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import { Search, X } from 'lucide-react'

import { useModal } from '@/hooks/useModal'
import { useDebounce } from '@/hooks/useDebounce'
import { ROUTE } from '@/config/routes.config'

import styles from './filters-search-bar.module.scss'

export const FiltersSearchBar: React.FC = () => {
	const router = useRouter()
	const pathname = usePathname()
	const params = useSearchParams()

	const [value, setValue] = React.useState('')

	const inputRef = React.useRef<HTMLInputElement>(null)

	const { onClose } = useModal()
	const { query } = useDebounce({ value, delay: 700 })

	const onClear = React.useCallback(() => {
		setValue('')
		inputRef.current?.focus()
	}, [])

	React.useEffect(() => {
		if (pathname === ROUTE.SEARCH) return

		const qs = new URLSearchParams(params.toString())

		if (!value) {
			qs.delete('q')
			router.replace(`?${qs.toString()}`)
			return
		}

		if (query) {
			onClose()
			qs.set('q', query)
		} else {
			qs.delete('q')
		}

		if (window.location.search !== `?${qs.toString()}`) {
			router.replace(`?${qs.toString()}`)
		}
	}, [value, query])

	return (
		<div className={styles.container}>
			<input
				ref={inputRef}
				className={styles.form}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				type='text'
				placeholder='Искать по категории'
				spellCheck={false}
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
