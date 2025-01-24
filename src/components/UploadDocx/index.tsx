'use client'

import React from 'react'
import Link from 'next/link'

import slugify from 'slugify'
import toast from 'react-hot-toast'
import { File, X } from 'lucide-react'
import { FileUploader } from '@/components'
import { deleteDocFile, uploadDocFile } from '@/app/actions'

import { ROUTE } from '@/config/routes.config'

import type { FrontmatterPostType } from '@/types/post.types'

import styles from './upload-docx.module.scss'

const fileTypes = [
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

interface IUploadDocx {
	items: FrontmatterPostType[]
}

export const UploadDocx: React.FC<IUploadDocx> = ({ items }) => {
	const [uploads, setUploads] = React.useState<FrontmatterPostType[]>(items)
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

				if (!uploads.find((upload) => upload.fileName === file.name)) {
					const originalName = file.name.split('.')[0]

					const frontmatter = {
						slug: slugify(originalName).toLowerCase(),
						title: originalName,
						fileName: file.name,
						lastModified: new Date(file.lastModified)
					}

					setUploads((prev) => [...prev, frontmatter])
				}
			} catch (error) {
				console.error('uploadDocFile:', error)
				setError('Произошла неизвестная ошибка')
			} finally {
				setIsLoading(false)
				if (inputRef.current) {
					inputRef.current.value = ''
				}
			}
		}
	}

	const onDelete = async (fileName: string) => {
		try {
			await deleteDocFile(fileName)

			setUploads((prev) => [
				...prev.filter((file) => file.fileName !== fileName)
			])

			toast.success('Статья была успешно удалена')
		} catch (error) {
			console.error('deleteDocFile:', error)
			toast.error('Возникла ошибка при удалении статьи')
		}
	}

	return (
		<div className={styles.container}>
			<FileUploader
				name='file'
				ref={inputRef}
				className={styles.input}
				label={error ?? ''}
				placeholder='Поддерживаемые форматы: doc, docx (до 1 MB за файл)'
				onChange={onChange}
				accept={fileTypes.join(',')}
				multiple={false}
				isError={Boolean(error)}
				isLoading={isLoading}
				isSuccess={isSuccess}
			/>

			<div className={styles.uploads}>
				<h5 className={styles.head}>Опубликованные статьи</h5>

				{uploads.length === 0 && (
					<span className={styles.description}>
						В каталоге не нашлось ни одной опубликованной статьи.
					</span>
				)}

				{uploads.length > 0 && (
					<div className={styles.list}>
						{uploads.map((item) => (
							<div
								key={item.slug}
								className={styles.article}
							>
								<Link
									className={styles.filename}
									href={`${ROUTE.BLOG}/${item.slug}`}
									target='_blank'
								>
									<File size={16} />
									{item.title}
								</Link>

								<button
									className={styles.remove}
									onClick={() => onDelete(item.fileName)}
								>
									<X size={16} />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
