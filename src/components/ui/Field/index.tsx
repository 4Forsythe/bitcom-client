'use client'

import React from 'react'

import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'

import styles from './field.module.scss'

export interface IField extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	extra?: string
	variant?: 'contained' | 'outlined'
	type?: 'number' | 'text' | 'tel' | 'password'
	isLoading?: boolean
	isError?: boolean
	placeholder?: string
}

export const Field = React.forwardRef<HTMLInputElement, IField>(
	(
		{
			label,
			className,
			variant = 'contained',
			type = 'text',
			placeholder,
			isLoading,
			isError,
			...rest
		},
		ref
	) => {
		const allowOnlyNumbers = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (
				type === 'number' &&
				!/[0-9]/.test(event.key) &&
				event.key !== 'Tab' &&
				event.key !== 'Backspace' &&
				event.key !== 'Enter' &&
				event.key !== 'ArrowLeft' &&
				event.key !== 'ArrowRight'
			) {
				event.preventDefault()
			}
		}

		return (
			<div
				className={clsx(styles.container, {
					[styles.contained]: variant === 'contained',
					[styles.outlined]: variant === 'outlined' || rest.readOnly,
					[styles.disabled]: rest.disabled,
					[styles.warned]: isError,
					[styles.loaded]: isLoading
				})}
			>
				<label
					htmlFor={rest.id}
					className={styles.label}
				>
					{label}
				</label>

				<input
					ref={ref}
					className={clsx(styles.input, className)}
					type={type !== 'number' ? type : 'text'}
					disabled={isLoading}
					placeholder={placeholder}
					onKeyDown={allowOnlyNumbers}
					autoComplete='off'
					{...rest}
				/>

				{isLoading && <LoaderCircle className={styles.loader} />}
			</div>
		)
	}
)

Field.displayName = 'Field'
