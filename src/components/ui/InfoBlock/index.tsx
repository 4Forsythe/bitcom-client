import React from 'react'

import clsx from 'clsx'
import { Info } from 'lucide-react'

import styles from './InfoBlock.module.scss'

interface InfoBlockProps {
	children: string | React.ReactNode
	variant?: 'contained' | 'outlined' | 'dangerous' | 'knowledge'
}

export const InfoBlock = ({
	children,
	variant = 'contained'
}: InfoBlockProps) => {
	return (
		<div
			className={clsx(styles.container, {
				[styles.contained]: variant === 'contained',
				[styles.outlined]: variant === 'outlined',
				[styles.dangerous]: variant === 'dangerous',
				[styles.knowledge]: variant === 'knowledge'
			})}
		>
			<div className={styles.inner}>
				{variant === 'dangerous' ? (
					<div className={styles.separator} />
				) : (
					<Info className={styles.icon} />
				)}
				<p>{children}</p>
			</div>
		</div>
	)
}
