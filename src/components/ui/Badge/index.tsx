import Link from 'next/link'

import clsx from 'clsx'

import styles from './Badge.module.scss'

interface BadgeProps {
	children: string | React.ReactNode
	href?: string
	variant?: 'contained' | 'outlined'
	disabled?: boolean
	className?: string
	onClick?: () => void
}

export const Badge = ({
	children,
	href,
	variant = 'outlined',
	disabled,
	className,
	onClick
}: BadgeProps) => {
	return (
		<>
			{href ? (
				<Link
					className={clsx(styles.container, className, {
						[styles.contained]: variant === 'contained',
						[styles.outlined]: variant === 'outlined',
						[styles.disabled]: disabled
					})}
					href={href}
					onClick={onClick}
				>
					{children}
				</Link>
			) : (
				<span
					className={clsx(styles.container, className, {
						[styles.contained]: variant === 'contained',
						[styles.outlined]: variant === 'outlined',
						[styles.disabled]: disabled
					})}
					onClick={onClick}
				>
					{children}
				</span>
			)}
		</>
	)
}
