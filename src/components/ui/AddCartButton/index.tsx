'use client'

import clsx from 'clsx'
import { ShoppingCart, LoaderCircle } from 'lucide-react'

import styles from './add-cart-button.module.scss'

interface AddCartButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'contained' | 'outlined'
	isLoading?: boolean
}

export const AddCartButton = ({
	className,
	children,
	variant = 'contained',
	isLoading,
	...rest
}: AddCartButtonProps) => {
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
			<ShoppingCart className={styles.icon} />
			{isLoading && <LoaderCircle className={styles.loader} />}
		</button>
	)
}
