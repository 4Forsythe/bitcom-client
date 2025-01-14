'use client'

import React from 'react'

import clsx from 'clsx'
import { RenderType } from '@/components/ProductList'

import styles from './list-render-button.module.scss'

type ListRenderButtonType = {
	name: string
	property: RenderType
}

const TYPES: ListRenderButtonType[] = [
	{
		name: '10',
		property: RenderType.SMALL
	},
	{
		name: '20',
		property: RenderType.MEDIUM
	},
	{
		name: '30',
		property: RenderType.LARGE
	},
	{
		name: 'Показать все',
		property: RenderType.INFINITE
	}
]

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
			{TYPES.map((type) => (
				<button
					key={type.property}
					className={clsx(styles.select, {
						[styles.target]: type.property === mode
					})}
					onClick={() => onChange(type.property)}
				>
					{type.name}
				</button>
			))}
		</div>
	)
}
