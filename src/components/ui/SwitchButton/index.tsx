'use client'

import React from 'react'

import clsx from 'clsx'
import { useFormContext, Controller } from 'react-hook-form'

import styles from './switch-button.module.scss'

interface ISwitchButton {
	name: string
	label?: string
}

export const SwitchButton: React.FC<ISwitchButton> = ({ name, label }) => {
	const { control } = useFormContext()

	return (
		<div className={styles.container}>
			<Controller
				name={name}
				control={control}
				defaultValue={false}
				render={({ field }) => (
					<label className={styles.checkbox}>
						<input
							id={name}
							type='checkbox'
							className={styles.input}
							checked={field.value}
							onChange={(event) => field.onChange(event.target.checked)}
						/>
						<div
							className={clsx(styles.control, {
								[styles.toggled]: field.value
							})}
						></div>
						<div
							className={clsx(styles.indicator, {
								[styles.toggled]: field.value
							})}
						></div>
					</label>
				)}
			/>
			{label && (
				<label
					htmlFor={name}
					className={styles.label}
				>
					{label}
				</label>
			)}
		</div>
	)
}
