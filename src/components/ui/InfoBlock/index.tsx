import clsx from 'clsx'
import { Info } from 'lucide-react'

import styles from './InfoBlock.module.scss'

interface InfoBlockProps {
	children: string
	variant?: 'contained' | 'outlined'
}

export const InfoBlock = ({
	children,
	variant = 'contained'
}: InfoBlockProps) => {
	return (
		<div
			className={clsx(styles.container, {
				[styles.contained]: variant === 'contained',
				[styles.outlined]: variant === 'outlined'
			})}
		>
			<div className={styles.inner}>
				<Info className={styles.icon} />
				<p>{children}</p>
			</div>
		</div>
	)
}
