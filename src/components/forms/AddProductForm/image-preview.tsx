import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import styles from './add-product-form.module.scss'
import { X } from 'lucide-react'

interface Props {
	url: string
	isPrimary: boolean
	onClick: () => void
	onDelete: () => void
}

export const ImagePreview: React.FC<Props> = React.memo(
	({ url, isPrimary, onClick, onDelete }) => {
		return (
			<div
				className={clsx(styles.imagePreview, {
					[styles.primary]: isPrimary
				})}
			>
				<Image
					className={styles.imageSource}
					src={url}
					width={150}
					height={115}
					alt={url}
					priority
					onClick={onClick}
				/>
				<button
					className={styles.imageDeleteButton}
					type='button'
					onClick={onDelete}
				>
					<X className={styles.icon} />
				</button>
			</div>
		)
	}
)
