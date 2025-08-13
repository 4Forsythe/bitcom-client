'use client'

import React from 'react'

import { OctagonAlert } from 'lucide-react'
import { useFormContext, get, Controller } from 'react-hook-form'

import { TextArea, type ITextArea } from '@/components/ui/TextArea'

import styles from './form-text-area.module.scss'
import clsx from 'clsx'

interface IFormTextArea extends ITextArea {
	name: string
	className?: string
}

export const FormTextArea = React.forwardRef<
	HTMLTextAreaElement | { resize: () => void },
	IFormTextArea
>(({ name, className, ...rest }, ref) => {
	const {
		watch,
		register,
		control,
		formState: { errors }
	} = useFormContext()

	const error = get(errors, name)

	return (
		<div className={clsx(styles.container, className)}>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<TextArea
						{...field}
						formValue={field.value}
						isError={!!error}
						{...rest}
					/>
				)}
			/>

			{error && (
				<span className={styles.error}>
					<OctagonAlert size={12} /> {error.message}
				</span>
			)}
		</div>
	)
})
