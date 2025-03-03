import { cn } from '@/utils'
import { LoaderCircle } from 'lucide-react'

import styles from './button.module.scss'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'sm' | 'md'
	variant?: 'contained' | 'outlined' | 'transparent'
	error?: string
	isLoading?: boolean
	className?: string
}

export const Button = ({
	children,
	size = 'md',
	variant = 'contained',
	error,
	isLoading,
	className,
	...rest
}: React.PropsWithChildren<IButton>) => {
	return (
		<div className={styles.container}>
			<button
				className={cn(styles.variant, className, {
					[styles.small]: size === 'sm',
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
