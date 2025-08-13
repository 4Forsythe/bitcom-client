import React from 'react'

import clsx from 'clsx'
import { Check, Info } from 'lucide-react'

import styles from './InfoBlock.module.scss'

interface InfoBlockProps {
	children: string | React.ReactNode
	variant?: 'contained' | 'outlined' | 'dangerous' | 'successfull' | 'knowledge'
	className?: string
}

export const InfoBlock = ({
	children,
	variant = 'contained',
	className
}: InfoBlockProps) => {
	return (
		<div
			className={clsx(styles.container, className, {
				[styles.contained]: variant === 'contained',
				[styles.outlined]: variant === 'outlined',
				[styles.dangerous]: variant === 'dangerous',
				[styles.successfull]: variant === 'successfull',
				[styles.knowledge]: variant === 'knowledge'
			})}
		>
			<div className={styles.inner}>
				{variant === 'dangerous' ? (
					<div className={styles.separator} />
				) : variant === 'successfull' ? (
					<Check className={styles.icon} />
				) : (
					<Info className={styles.icon} />
				)}
				<p>{children}</p>
			</div>
		</div>
	)
}
