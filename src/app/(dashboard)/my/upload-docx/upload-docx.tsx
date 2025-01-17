'use client'

import React from 'react'

import { FileUploader } from '@/components'
import { uploadDocFile } from '@/app/actions'

const fileTypes = [
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

export const UploadDocx: React.FC = () => {
	const [error, setError] = React.useState('')
	const [isLoading, setIsLoading] = React.useState(false)
	const [isSuccess, setIsSuccess] = React.useState(false)

	const inputRef = React.useRef<HTMLInputElement | null>(null)
	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

	React.useEffect(() => {
		return () => {
			timeoutRef.current && clearTimeout(timeoutRef.current)
		}
	}, [])

	const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setError('')
		const file = event.target.files && event.target.files[0]

		if (file) {
			const isValid = fileTypes.includes(file.type)
			if (!isValid) {
				return setError('Загрузить можно только .doc и .docx')
			}

			try {
				setIsLoading(true)

				const formData = new FormData()
				formData.append('file', file, file.name)

				await uploadDocFile(formData)

				setIsSuccess(true)
				timeoutRef.current = setTimeout(() => {
					setIsSuccess(false)
				}, 5000)
			} catch (error) {
				setError('Произошла неизвестная ошибка')
				console.error('uploadDocFile:', error)
			} finally {
				setIsLoading(false)
				if (inputRef.current) {
					inputRef.current.value = ''
				}
			}
		}
	}

	return (
		<div className='my-5 h-full flex flex-1 flex-col'>
			<FileUploader
				name='file'
				ref={inputRef}
				className='flex-1'
				label={error ?? ''}
				placeholder='Поддерживаемые форматы: doc, docx (до 1 MB за файл)'
				onChange={onChange}
				accept={fileTypes.join(',')}
				multiple={false}
				isError={Boolean(error)}
				isLoading={isLoading}
				isSuccess={isSuccess}
			/>
		</div>
	)
}
