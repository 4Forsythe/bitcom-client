'use client'

import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Check, Pen, PencilLine, Settings, X } from 'lucide-react'

import { Field } from '../Field'
import { Button } from '../Button'

import { ROUTE } from '@/config/routes.config'
import { useUpdateDiscount } from '@/hooks/useUpdateDiscount'

import {
	DiscountTypeVariables,
	type DiscountType
} from '@/types/discount.types'

import styles from './discount-manager-controls.module.scss'
import toast from 'react-hot-toast'

interface Props {
	size?: 'small' | 'default'
	refreshPage?: boolean
	discount: DiscountType
}

export const DiscountManagerControls: React.FC<Props> = ({
	size = 'default',
	refreshPage,
	discount
}) => {
	const router = useRouter()
	const { id, type, amount, isArchived } = discount

	const inputRef = React.useRef<HTMLInputElement>(null)
	const containerRef = React.useRef<HTMLDivElement>(null)

	const [amountValue, setAmountValue] = React.useState(amount || '')
	const [isEditingAmount, setIsEditingAmount] = React.useState(false)

	const {
		updateDiscountAsync,
		isUpdateDiscountPending,
		isUpdateDiscountSuccess
	} = useUpdateDiscount()

	const onEditClick = () => {
		router.push(`${ROUTE.ADD_DISCOUNT}?discountId=${id}`)
	}

	const onUpdateAmount = async () => {
		if (amountValue && Number(amountValue) >= 1 && Number(amountValue) <= 99) {
			await updateDiscountAsync({
				id,
				dto: { amount: Number(amountValue) }
			})
			setIsEditingAmount(false)
		} else {
			toast.error('Процент скидки должен быть в диапазоне от 1% до 99%')
		}
	}

	React.useEffect(() => {
		if (refreshPage && isUpdateDiscountSuccess) {
			router.refresh()
		}
	}, [isUpdateDiscountSuccess])

	React.useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsEditingAmount(false)
			}
		}

		document.body.addEventListener('click', handleOutsideClick)

		return () => {
			document.body.removeEventListener('click', handleOutsideClick)
		}
	}, [])

	React.useEffect(() => {
		if (isEditingAmount) {
			inputRef.current?.focus()
		}
	}, [isEditingAmount])

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
					<Settings size={18} />
					{size === 'default' && 'Настроить'}
				</button>
				{type === DiscountTypeVariables.PERCENT &&
					(!isEditingAmount ? (
						<button
							className={styles.amount}
							onClick={() => setIsEditingAmount(true)}
						>
							<span className={styles.value}>{amount}%</span>
							<span className={styles.edit}>
								<Pen size={16} />
							</span>
						</button>
					) : (
						<div
							ref={containerRef}
							className={clsx(styles.amount, {
								[styles.editing]: isEditingAmount
							})}
						>
							<div className={styles.field}>
								<span className={styles.fieldTitle}>Процент</span>
								<Field
									ref={inputRef}
									className={styles.fieldInput}
									type='number'
									value={amountValue}
									onChange={(event) => setAmountValue(event.target.value)}
									isLoading={isUpdateDiscountPending}
								/>
							</div>
							<Button
								size='icon'
								onClick={onUpdateAmount}
								isLoading={isUpdateDiscountPending}
							>
								<Check size={18} />
							</Button>
							<Button
								size='icon'
								variant='outlined'
								onClick={() => setIsEditingAmount(false)}
								isLoading={isUpdateDiscountPending}
							>
								<X size={18} />
							</Button>
						</div>
					))}
			</div>
		</div>
	)
}
