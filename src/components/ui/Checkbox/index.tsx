import React from 'react'
import clsx from 'clsx'

import styles from './checkbox.module.scss'

interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	isLoading?: boolean
	className?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, ICheckbox>(
	({ id, label, isLoading, className, ...rest }, ref) => {
		return (
			<div className={clsx(styles.container, className)}>
				<input
					id={id}
					ref={ref}
					className={styles.input}
					type='checkbox'
					disabled={isLoading || rest.disabled}
					{...rest}
				/>
				{label && (
					<label
						htmlFor={id}
						className={styles.label}
						onClick={(event) => event.stopPropagation()}
					>
						{label}
					</label>
				)}
			</div>
		)
	}
)

Checkbox.displayName = 'Checkbox'
