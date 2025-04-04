'use client'

import React from 'react'
import clsx from 'clsx'

import styles from './load-more.module.scss'
import { Loader2 } from 'lucide-react'

interface ILoadMore {
	isLoading?: boolean
	onLoad: () => void
}

export const LoadMore: React.FC<ILoadMore> = ({ isLoading, onLoad }) => {
	return (
		<div className={styles.container}>
			<button
				className={clsx(styles.select, { [styles.loader]: isLoading })}
				onClick={onLoad}
				disabled={isLoading}
			>
				{isLoading ? <Loader2 className={styles.icon} /> : 'Показать больше'}
			</button>
		</div>
	)
}
