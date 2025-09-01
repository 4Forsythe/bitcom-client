'use client'

import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Archive, BadgePercent, Eye, EyeOff, PencilLine } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'
import { useUpdateProduct } from '@/hooks/useUpdateProduct'

import type { ProductType } from '@/types/product.types'

import styles from './product-manager-controls.module.scss'

interface Props {
	size?: 'small' | 'default'
	refreshPage?: boolean
	product: ProductType
}

export const ProductManagerControls: React.FC<Props> = ({
	size = 'default',
	refreshPage,
	product
}) => {
	const router = useRouter()
	const { id, discount, isPublished, isArchived } = product

	const { updateProductAsync, isUpdateProductSuccess } = useUpdateProduct()

	const onEditClick = () => {
		router.push(`${ROUTE.ADD_PRODUCT}?productId=${id}`)
	}

	const onEditDiscountClick = () => {
		router.push(`${ROUTE.ADD_DISCOUNT}?discountId=${discount?.id}`)
	}

	const onPublishToggle = async () => {
		await updateProductAsync({
			id,
			dto: { isPublished: !isPublished }
		})
	}

	const onArchiveClick = async () => {
		if (!isArchived) {
			await updateProductAsync({
				id,
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
				className={clsx(styles.container, 'animate-opacity', {
					[styles.small]: size === 'small'
				})}
			>
				<div className={styles.buttons}>
					<button
						className={clsx(styles.button, styles.wide)}
						onClick={onEditClick}
					>
						<PencilLine size={18} />
					</button>
					<button
						className={clsx(styles.button, styles.wide, {
							[styles.active]: !isPublished
						})}
						onClick={onPublishToggle}
					>
						{isPublished ? <EyeOff size={18} /> : <Eye size={18} />}
						{isPublished ? 'Скрыть' : 'На показ'}
					</button>
					{discount && (
						<button
							className={clsx(styles.button, styles.wide)}
							onClick={onEditDiscountClick}
						>
							<BadgePercent size={18} />
							Настроить акцию
						</button>
					)}
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
		<div className={clsx(styles.container, 'animate-opacity')}>
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
				{discount && (
					<button
						className={clsx(styles.button, styles.wide)}
						onClick={onEditDiscountClick}
					>
						<BadgePercent size={24} />
						Настроить акцию
					</button>
				)}
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
