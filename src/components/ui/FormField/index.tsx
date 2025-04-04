'use client'

import React from 'react'

import { OctagonAlert } from 'lucide-react'
import { useFormContext, get } from 'react-hook-form'

import { Field, type IField } from '@/components/ui/Field'

import styles from './form-field.module.scss'

interface IFormField extends IField {
	name: string
}

export const FormField: React.FC<IFormField> = ({ name, ...rest }) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	const error = get(errors, name)

	return (
		<div className={styles.container}>
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
