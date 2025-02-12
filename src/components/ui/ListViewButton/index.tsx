'use client'

import React from 'react'

import clsx from 'clsx'
import { LayoutGrid, StretchHorizontal } from 'lucide-react'

import { ViewType } from '@/components/ProductList'
import { useWindowSize } from '@/hooks/useWindowSize'

import styles from './list-view-button.module.scss'

interface IListViewButton {
	mode: ViewType
	className?: string
	onChange: (mode: ViewType) => void
}

export const ListViewButton: React.FC<IListViewButton> = ({
	mode,
	className,
	onChange
}) => {
	const { width } = useWindowSize()

	React.useEffect(() => {
		if (width && width <= 768) {
			onChange(ViewType.SIMPLE)
		}
	}, [width])

	return (
		<div className={clsx(styles.container, className)}>
			<button
				className={clsx(styles.button, {
					[styles.active]: mode === ViewType.TILE
				})}
				onClick={() => onChange(ViewType.TILE)}
			>
				<LayoutGrid size={24} />
			</button>
			<button
				className={clsx(styles.button, {
					[styles.active]: mode === ViewType.SIMPLE
				})}
				onClick={() => onChange(ViewType.SIMPLE)}
			>
				<StretchHorizontal size={24} />
			</button>
		</div>
	)
}
