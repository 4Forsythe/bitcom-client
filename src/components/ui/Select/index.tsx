'use client'

import React from 'react'

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
	const [isDropdown, setIsDropdown] = React.useState(false)

	const dropdownRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdown(false)
			}
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	})

	return (
		<div
			ref={dropdownRef}
			className={styles.container}
		>
			<button
				className={styles.targetItem}
				onClick={() => setIsDropdown((prev) => !prev)}
			>
				{selected ? selected.title : placeholder}
			</button>
			{isDropdown && items.length > 0 && (
				<div className={styles.dropdown}>
					{items.map((item) => (
						<button
							key={item.title}
							onClick={() => onSelect(item.id)}
						>
							{item.node}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
