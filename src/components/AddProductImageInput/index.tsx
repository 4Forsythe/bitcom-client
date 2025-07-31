'use client'

import React from 'react'

import clsx from 'clsx'
import { Camera, Image, LoaderCircle } from 'lucide-react'

import { useFileInput } from '@/hooks/useFileInput'

import styles from './add-product-image-input.module.scss'

export interface IFileUploader
	extends React.InputHTMLAttributes<HTMLInputElement> {
	isLoading?: boolean
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onDrop: (event: React.DragEvent<HTMLDivElement>) => void
}

export const AddProductImageInput = React.forwardRef<
	HTMLInputElement,
	IFileUploader
>(
	(
		{
			accept = '.jpg,.jpeg,.png,.webp',
			isLoading,
			className,
			onChange,
			onDrop,
			...rest
		},
		ref
	) => {
		const dragCounter = React.useRef(0)
		const [isDragging, setIsDragging] = React.useState(false)

		const { ref: inputRef, open } = useFileInput()

		React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

		const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault()
			event.stopPropagation()

			dragCounter.current += 1

			if (event.type === 'dragenter' || event.type === 'dragover') {
				setIsDragging(true)
			}
		}

		const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault()
			event.stopPropagation()

			dragCounter.current -= 1

			if (dragCounter.current === 0) {
				setIsDragging(false)
			}
		}

		const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault()
			event.stopPropagation()

			dragCounter.current = 0

			setIsDragging(false)
			onDrop(event)
		}

		return (
			<div
				className={clsx(styles.container, className, {
					[styles.dragging]: isDragging,
					[styles.loading]: isLoading,
					[styles.disabled]: rest.disabled
				})}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onDragOver={(event) => event.preventDefault()}
			>
				<label
					htmlFor={rest.id}
					className={styles.label}
					onClick={open}
				>
					{isDragging ? (
						<Image className={styles.icon} />
					) : (
						<Camera className={styles.icon} />
					)}
					{isDragging && 'Перетащите файлы сюда'}
				</label>

				<input
					ref={inputRef}
					className={styles.input}
					type='file'
					disabled={isLoading}
					onChange={onChange}
					accept={accept}
					{...rest}
				/>

				{isLoading && <LoaderCircle className={styles.loader} />}
			</div>
		)
	}
)

AddProductImageInput.displayName = 'AddProductImageInput'
