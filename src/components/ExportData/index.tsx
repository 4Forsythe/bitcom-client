'use client'

import React from 'react'
import toast from 'react-hot-toast'
import clsx from 'clsx'

import { API_BASE_URL } from '@/constants'

import styles from './export-data.module.scss'

export const ExportData: React.FC = () => {
	const [isFileProcessing, setIsFileProcessing] = React.useState(false)

	const handleDownloadFile = async () => {
		setIsFileProcessing(true)

		try {
			window.open(`${API_BASE_URL}/product/export`, '_blank')
		} catch (error) {
			console.error('ExportData: handleDownloadFile', error)
			toast.error('Возникла ошибка при экспорте в Excel')
		} finally {
			setIsFileProcessing(false)
		}
	}

	return (
		<div className={styles.container}>
			<button
				className={clsx(styles.exportItem, {
					[styles.loader]: isFileProcessing
				})}
				onClick={handleDownloadFile}
			>
				{isFileProcessing ? 'Генерируем файл...' : 'Прайс-лист по всем товарам'}
				<span className={styles.extension}>.xlsx</span>
			</button>
		</div>
	)
}
