import React from 'react'
import Link from 'next/link'
import { cn } from '@/utils'
import { LoaderCircle } from 'lucide-react'

import styles from './button.module.scss'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'sm' | 'md' | 'icon'
	variant?: 'contained' | 'outlined' | 'transparent'
	error?: string
	isLoading?: boolean
	asLink?: string
	target?: React.HTMLAttributeAnchorTarget
	className?: string
}

export const Button: React.FC<React.PropsWithChildren<IButton>> = ({
	children,
	size = 'md',
	variant = 'contained',
	error,
	isLoading,
	asLink,
	target,
	className,
	...rest
}) => {
	if (asLink) {
		return (
			<Link
				href={asLink}
				className={styles.container}
				target={target}
			>
				<div
					className={cn(styles.variant, className, {
						[styles.small]: size === 'sm',
						[styles.icon]: size === 'icon',
						[styles.contained]: variant === 'contained',
						[styles.outlined]: variant === 'outlined',
						[styles.transparent]: variant === 'transparent',
						[styles.loading]: isLoading
					})}
				>
					{children}
					{isLoading && <LoaderCircle className={styles.loader} />}
				</div>
				{error && <span className={styles.error}>{error}</span>}
			</Link>
		)
	}

	return (
		<div className={styles.container}>
			<button
				className={cn(styles.variant, className, {
					[styles.small]: size === 'sm',
					[styles.icon]: size === 'icon',
					[styles.contained]: variant === 'contained',
					[styles.outlined]: variant === 'outlined',
					[styles.transparent]: variant === 'transparent',
					[styles.loading]: isLoading
				})}
				disabled={isLoading}
				{...rest}
			>
				{children}
				{isLoading && <LoaderCircle className={styles.loader} />}
			</button>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	)
}
