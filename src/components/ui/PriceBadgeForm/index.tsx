'use client'

import React from 'react'
import { Check, Pen, X } from 'lucide-react'

import { Field } from '../Field'
import { Button } from '../Button'
import { PriceBadge, IPriceBadgeProps } from '../PriceBadge'

import styles from './price-badge-form.module.scss'
import { useUpdateProduct } from '@/hooks/useUpdateProduct'
import clsx from 'clsx'
import toast from 'react-hot-toast'

interface Props extends IPriceBadgeProps {
	productId: string
}

export const PriceBadgeForm: React.FC<Props> = ({
	productId,
	size,
	price,
	discountPrice
}) => {
	const [priceValue, setPriceValue] = React.useState(price)
	const [discountPriceValue, setDiscountPriceValue] = React.useState(
		Number(price) <= Number(discountPrice) ? '' : discountPrice
	)

	const [isEditing, setIsEditing] = React.useState(false)

	const inputRef = React.useRef<HTMLInputElement>(null)
	const containerRef = React.useRef<HTMLDivElement>(null)

	const { updateProductAsync, isUpdateProductPending } = useUpdateProduct()

	const onUpdate = async () => {
		if (Number(discountPriceValue) < Number(priceValue)) {
			await updateProductAsync({
				id: productId,
				dto: {
					price: Number(priceValue),
					discountPrice: Number(discountPriceValue)
				}
			})
			setIsEditing(false)
		} else {
			toast.error('Скидочная цена должна быть меньше розничной')
		}
	}

	React.useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsEditing(false)
			}
		}

		document.body.addEventListener('click', handleOutsideClick)

		return () => {
			document.body.removeEventListener('click', handleOutsideClick)
		}
	}, [])

	React.useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus()
		}
	}, [isEditing])

	if (isEditing) {
		return (
			<div
				ref={containerRef}
				className={clsx(styles.container, { [styles.editing]: isEditing })}
			>
				<div className={styles.field}>
					<span className={styles.fieldTitle}>Цена</span>
					<Field
						ref={!discountPriceValue ? inputRef : null}
						className={styles.fieldInput}
						type='number'
						value={priceValue}
						onChange={(event) => setPriceValue(event.target.value)}
						isLoading={isUpdateProductPending}
					/>
				</div>
				<div className={styles.field}>
					<span className={styles.fieldTitle}>Скидка</span>
					<Field
						ref={discountPriceValue ? inputRef : null}
						className={styles.fieldInput}
						type='number'
						value={discountPriceValue}
						onChange={(event) => setDiscountPriceValue(event.target.value)}
						isLoading={isUpdateProductPending}
					/>
				</div>
				<Button
					className={styles.button}
					size='icon'
					onClick={onUpdate}
					isLoading={isUpdateProductPending}
				>
					<Check size={18} />
				</Button>
				<Button
					className={styles.button}
					size='icon'
					variant='outlined'
					onClick={() => setIsEditing(false)}
					isLoading={isUpdateProductPending}
				>
					<X size={18} />
				</Button>
			</div>
		)
	}

	return (
		<button
			className={styles.container}
			onClick={() => setIsEditing(true)}
		>
			<PriceBadge
				size={size}
				price={price}
				discountPrice={discountPrice}
			/>
			<span className={styles.edit}>
				<Pen size={16} />
			</span>
		</button>
	)
}
