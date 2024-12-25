'use client'

import React from 'react'

import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'

import styles from './TextArea.module.scss'

interface ITextArea extends React.InputHTMLAttributes<HTMLTextAreaElement> {
	id: string
	label: string
	state?: 'success' | 'error'
	variant?: 'contained' | 'outlined'
	extra?: string
	isLoading?: boolean
	disabled?: boolean
	placeholder?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, ITextArea>(
	(
		{
			id,
			label,
			state,
			variant = 'contained',
			extra,
			placeholder,
			isLoading,
			disabled,
			...rest
		},
		ref
	) => {
		return (
			<div
				className={clsx(styles.container, {
					[styles.contained]: variant === 'contained',
					[styles.outlined]: variant === 'outlined',
					[styles.loaded]: isLoading
				})}
			>
				<label
					htmlFor={id}
					className={styles.label}
				>
					{label}
				</label>
				<textarea
					id={id}
					className={clsx(styles.area, extra, {
						[styles.success]: state === 'success',
						[styles.error]: state === 'error'
					})}
					ref={ref}
					type='text'
					disabled={disabled || isLoading}
					placeholder={placeholder}
					autoComplete='off'
					{...rest}
				/>
				{isLoading && <LoaderCircle className={styles.loader} />}
			</div>
		)
	}
)

TextArea.displayName = 'TextArea'
