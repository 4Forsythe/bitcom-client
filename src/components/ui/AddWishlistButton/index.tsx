'use client'

import clsx from 'clsx'
import { Heart, LoaderCircle } from 'lucide-react'

import styles from './AddWishlistButton.module.scss'

interface AddWishlistButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'contained' | 'outlined'
	isLoading?: boolean
}

export const AddWishlistButton = ({
	className,
	children,
	variant = 'contained',
	isLoading,
	...rest
}: AddWishlistButtonProps) => {
	return (
		<button
			className={clsx(styles.container, className, {
				[styles.contained]: variant === 'contained',
				[styles.outlined]: variant === 'outlined',
				[styles.loaded]: isLoading
			})}
			disabled={isLoading}
			{...rest}
		>
			<Heart className={styles.icon} />
			{isLoading && <LoaderCircle className={styles.loader} />}
		</button>
	)
}
