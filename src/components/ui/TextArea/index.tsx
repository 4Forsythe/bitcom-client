'use client'

import React from 'react'

import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'

import styles from './text-area.module.scss'

export interface ITextArea
	extends React.InputHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	hint?: string
	variant?: 'contained' | 'outlined'
	isLoading?: boolean
	isError?: boolean
	disabled?: boolean
	placeholder?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, ITextArea>(
	(
		{
			label,
			hint,
			variant = 'contained',
			value,
			onInput,
			placeholder,
			isLoading,
			isError,
			className,
			...rest
		},
		ref
	) => {
		const textareaRef = React.useRef<HTMLTextAreaElement>(null)

		console.log('maxlen', rest.maxLength)
		console.log('val', value)

		React.useImperativeHandle(
			ref,
			() => textareaRef.current as HTMLTextAreaElement
		)

		const resize = () => {
			const current = textareaRef.current

			if (current) {
				current.style.height = 'auto'
				current.style.height = current.scrollHeight + 'px'
			}
		}

		React.useEffect(() => {
			resize()
		}, [value])

		const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
			resize()
			onInput?.(event)
		}

		return (
			<React.Fragment>
				<div
					className={clsx(styles.container, {
						[styles.contained]: variant === 'contained',
						[styles.outlined]: variant === 'outlined',
						[styles.loaded]: isLoading
					})}
				>
					{label && (
						<label
							htmlFor={rest.id}
							className={styles.label}
						>
							{label}
						</label>
					)}

					<textarea
						ref={textareaRef}
						className={clsx(styles.area, className)}
						value={value}
						onInput={handleInput}
						disabled={isLoading}
						placeholder={placeholder}
						style={{
							resize: 'none',
							overflow: 'hidden'
						}}
						autoComplete='off'
						{...rest}
					/>

					{rest.maxLength && typeof value === 'string' && (
						<span>
							{value.length} / {rest.maxLength}
						</span>
					)}

					{isLoading && <LoaderCircle className={styles.loader} />}
				</div>

				{!isError && hint && <p className={styles.hint}>{hint}</p>}
			</React.Fragment>
		)
	}
)

TextArea.displayName = 'TextArea'
