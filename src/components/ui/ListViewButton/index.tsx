'use client'

import React from 'react'

import clsx from 'clsx'
import { LayoutGrid, StretchHorizontal } from 'lucide-react'

import { ListView } from '@/components/ProductList'

import styles from './list-view-button.module.scss'

interface IListViewButton {
	view: ListView
	className?: string
	onChange: (mode: ListView) => void
}

export const ListViewButton: React.FC<IListViewButton> = ({
	view,
	className,
	onChange
}) => {
	return (
		<div className={clsx(styles.container, className)}>
			<button
				className={clsx(styles.button, {
					[styles.active]: view === ListView.TILE
				})}
				onClick={() => onChange(ListView.TILE)}
			>
				<LayoutGrid size={24} />
			</button>
			<button
				className={clsx(styles.button, {
					[styles.active]: view === ListView.SIMPLE
				})}
				onClick={() => onChange(ListView.SIMPLE)}
			>
				<StretchHorizontal size={24} />
			</button>
		</div>
	)
}
