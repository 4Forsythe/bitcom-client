'use client'

import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Archive, Eye, EyeOff, PencilLine } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'
import { useUpdateProduct } from '@/hooks/useUpdateProduct'

import styles from './product-manager-controls.module.scss'

interface Props {
	size?: 'small' | 'default'
	refreshPage?: boolean
	productId: string
	isPublished: boolean
	isArchived: boolean
}

export const ProductManagerControls: React.FC<Props> = ({
	size = 'default',
	refreshPage,
	productId,
	isPublished,
	isArchived
}) => {
	const router = useRouter()
	const { updateProductAsync, isUpdateProductSuccess } = useUpdateProduct()

	const onEditClick = () => {
		router.push(`${ROUTE.ADD_PRODUCT}?productId=${productId}`)
	}

	const onPublishToggle = async () => {
		await updateProductAsync({
			id: productId,
			dto: { isPublished: !isPublished }
		})
	}

	const onArchiveClick = async () => {
		if (!isArchived) {
			await updateProductAsync({
				id: productId,
				dto: { isArchived: true }
			})
		}
	}

	React.useEffect(() => {
		if (refreshPage && isUpdateProductSuccess) {
			router.refresh()
		}
	}, [isUpdateProductSuccess])

	if (size === 'small') {
		return (
			<div
				className={clsx(styles.container, {
					[styles.small]: size === 'small'
				})}
			>
				<div className={styles.buttons}>
					<button
						className={clsx(styles.button, styles.wide, {
							[styles.active]: !isPublished
						})}
						onClick={onPublishToggle}
					>
						{isPublished ? <EyeOff size={18} /> : <Eye size={18} />}
						{isPublished ? 'Скрыть' : 'На показ'}
					</button>
					<button
						className={clsx(styles.button, styles.wide)}
						onClick={onEditClick}
					>
						<PencilLine size={18} />
					</button>
					{!isArchived && (
						<button
							className={clsx(styles.button, styles.wide)}
							onClick={onArchiveClick}
						>
							<Archive size={18} />
						</button>
					)}
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.buttons}>
				<button
					className={clsx(styles.button, styles.wide)}
					onClick={onEditClick}
				>
					<PencilLine size={24} />
					Изменить
				</button>
				<button
					className={clsx(styles.button, styles.wide, {
						[styles.active]: !isPublished
					})}
					onClick={onPublishToggle}
				>
					{isPublished ? <EyeOff size={20} /> : <Eye size={20} />}
					{isPublished ? 'Скрыть' : 'Опубликовать'}
				</button>
			</div>
			{!isArchived && (
				<button
					className={styles.button}
					onClick={onArchiveClick}
				>
					<Archive size={20} />В архив
				</button>
			)}
		</div>
	)
}
