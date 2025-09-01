import Link from 'next/link'

import clsx from 'clsx'

import styles from './Badge.module.scss'

interface BadgeProps {
	children: string | React.ReactNode
	href?: string
	variant?: 'contained' | 'outlined'
	color?: 'grey' | 'red' | 'orange' | 'green'
	size?: 'md' | 'sm'
	disabled?: boolean
	className?: string
	onClick?: () => void
}

export const Badge = ({
	children,
	href,
	variant = 'outlined',
	color = 'grey',
	size = 'md',
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
						[styles.grey]: color === 'grey',
						[styles.red]: color === 'red',
						[styles.orange]: color === 'orange',
						[styles.green]: color === 'green',
						[styles.medium]: size === 'md',
						[styles.small]: size === 'sm',
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
						[styles.grey]: color === 'grey',
						[styles.red]: color === 'red',
						[styles.orange]: color === 'orange',
						[styles.green]: color === 'green',
						[styles.medium]: size === 'md',
						[styles.small]: size === 'sm',
						[styles.clickable]: onClick,
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
