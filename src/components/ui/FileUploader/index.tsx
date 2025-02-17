'use client'

import React from 'react'

import clsx from 'clsx'
import { LoaderCircle, SquareCheckBig, Upload } from 'lucide-react'

import styles from './file-uploader.module.scss'

export interface IFileUploader
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	placeholder: string
	isError?: boolean
	isLoading?: boolean
	isSuccess?: boolean
}

export const FileUploader = React.forwardRef<HTMLInputElement, IFileUploader>(
	(
		{ label, placeholder, className, isError, isLoading, isSuccess, ...rest },
		ref
	) => {
		const [isDragging, setIsDragging] = React.useState(false)

		const handleDragLeave = (event: React.DragEvent) => {
			event.preventDefault()
			setIsDragging(false)
		}

		const handleDragEnter = (event: React.DragEvent) => {
			event.preventDefault()
			event.stopPropagation()

			if (event.type === 'dragenter' || event.type === 'dragover') {
				setIsDragging(true)
			}
		}

		return (
			<div
				className={clsx(styles.container, className, {
					[styles.dragging]: isDragging,
					[styles.disabled]: rest.disabled,
					[styles.warned]: isError,
					[styles.loaded]: isLoading,
					[styles.successed]: isSuccess
				})}
			>
				{isSuccess ? (
					<SquareCheckBig className={styles.icon} />
				) : (
					<Upload className={styles.icon} />
				)}

				<label
					htmlFor={rest.id}
					className={styles.label}
				>
					{isSuccess ? 'Файл загружен' : label || 'Выберите файл'}
				</label>

				<p className={styles.description}>{placeholder}</p>

				<input
					ref={ref}
					className={styles.input}
					type='file'
					disabled={isLoading}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDrop={() => setIsDragging(false)}
					{...rest}
				/>

				{isLoading && <LoaderCircle className={styles.loader} />}
			</div>
		)
	}
)

FileUploader.displayName = 'FileUploader'
