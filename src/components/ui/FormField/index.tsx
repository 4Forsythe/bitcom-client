'use client'

import React from 'react'

import { OctagonAlert } from 'lucide-react'
import { useFormContext, get } from 'react-hook-form'

import { Field, type IField } from '@/components/ui/Field'

import styles from './form-field.module.scss'
import clsx from 'clsx'

interface IFormField extends IField {
	name: string
	className?: string
}

export const FormField: React.FC<IFormField> = ({
	name,
	className,
	...rest
}) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	const error = get(errors, name)

	return (
		<div className={clsx(styles.container, className)}>
			<Field
				id={name}
				isError={error}
				{...register(name)}
				{...rest}
			/>

			{error && (
				<span className={styles.error}>
					<OctagonAlert size={12} /> {error.message}
				</span>
			)}
		</div>
	)
}
