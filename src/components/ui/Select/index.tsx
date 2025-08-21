'use client'

import React from 'react'
import clsx from 'clsx'
import { ChevronDown, Lock } from 'lucide-react'

import { useDropdown } from '@/hooks/useDropdown'

import styles from './select.module.scss'

export type SelectItemType = {
	id: string
	title: string
	node: React.ReactNode | string
	disabled?: boolean
}

interface Props {
	items: SelectItemType[]
	selected?: SelectItemType
	placeholder: string
	onSelect: (id: string) => void
}

export const Select: React.FC<Props> = ({
	items,
	selected,
	placeholder,
	onSelect
}) => {
	const { ref, isDropdown, setIsDropdown } = useDropdown()

	return (
		<div
			ref={ref}
			className={styles.container}
		>
			<button
				type='button'
				className={styles.targetItem}
				onClick={() => setIsDropdown((prev) => !prev)}
			>
				{selected ? selected.title : placeholder}
				<ChevronDown
					className={clsx(styles.icon, { [styles.opened]: isDropdown })}
					size={20}
				/>
			</button>
			{isDropdown && items.length > 0 && (
				<div className={styles.dropdown}>
					<div className={styles.items}>
						{items.map((item) => (
							<button
								type='button'
								key={item.title}
								className={clsx(styles.item, {
									[styles.active]: item.id === selected?.id
								})}
								onClick={() => {
									onSelect(item.id)
									setIsDropdown(false)
								}}
								disabled={item.disabled}
							>
								{item.disabled && <Lock size={20} />}
								{item.node}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
