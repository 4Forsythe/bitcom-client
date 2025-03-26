'use client'

import React from 'react'

import clsx from 'clsx'
import { RenderType } from '@/components/ProductList'

import styles from './list-render-button.module.scss'

interface IListRenderButton {
	mode: RenderType
	className?: string
	onChange: (mode: RenderType) => void
}

export const ListRenderButton: React.FC<IListRenderButton> = ({
	mode,
	className,
	onChange
}) => {
	return (
		<div className={clsx(styles.container, className)}>
			<button
				className={styles.select}
				onClick={() => onChange(RenderType.INFINITE)}
				disabled={mode === RenderType.INFINITE}
			>
				Показать все
			</button>
		</div>
	)
}
