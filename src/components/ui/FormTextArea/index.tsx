'use client'

import React from 'react'

import { OctagonAlert } from 'lucide-react'
import { useFormContext, get } from 'react-hook-form'

import { TextArea, type ITextArea } from '@/components/ui/TextArea'

import styles from './form-text-area.module.scss'

interface IFormTextArea extends ITextArea {
	name: string
}

export const FormTextArea: React.FC<IFormTextArea> = ({ name, ...rest }) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	const error = get(errors, name)

	return (
		<div className={styles.container}>
			<TextArea
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
