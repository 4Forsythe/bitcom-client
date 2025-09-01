'use client'

import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

import { getDiscountFirstTargetImageUrl } from '@/utils/get-discount-first-target-image-url'

import { PriceBadge } from '../ui'
import { ProductImage } from '../ProductImage'

import {
	type DiscountType,
	type DiscountTargetType,
	DiscountTypeVariables
} from '@/types/discount.types'

import styles from './discount-poster.module.scss'

interface Props {
	variant?: 'card' | 'screen'
	discount: DiscountType
	target: DiscountTargetType
}

export const DiscountPoster: React.FC<Props> = ({
	variant = 'card',
	discount,
	target
}) => {
	const { type, amount, expiresAt } = discount

	const imageUrl = getDiscountFirstTargetImageUrl(target)

	return (
		<div
			className={clsx(styles.container, {
				[styles.big]: variant === 'screen',
				[styles.small]: variant === 'card'
			})}
		>
			<div className={styles.inner}>
				<div className={styles.information}>
					{type === DiscountTypeVariables.PERCENT && (
						<div className={styles.amount}>
							{amount}
							<span className={styles.percent}>%</span>
						</div>
					)}
					<div className={styles.text}>
						<div className={styles.caption}>
							до{' '}
							{new Date(expiresAt).toLocaleString(undefined, {
								day: 'numeric',
								month: 'long'
							})}
						</div>
						<div className={styles.title}>Акция</div>
					</div>
					{variant === 'card' && target.product && (
						<PriceBadge
							className={styles.price}
							size='small'
							price={target.product.price}
							discountPrice={
								Number(target.product.price) -
								(Number(target.product.price) / 100) * +amount
							}
						/>
					)}
				</div>
				{imageUrl && (
					<div className={styles.product}>
						{variant === 'screen' && (
							<div className={styles.productInformation}>
								<div className={styles.description}>
									{target.product?.name || target.category?.name}
								</div>
								{target.product && (
									<PriceBadge
										className={styles.price}
										price={target.product.price}
										discountPrice={
											Number(target.product.price) -
											(Number(target.product.price) / 100) * +amount
										}
									/>
								)}
							</div>
						)}
						{variant === 'card' ? (
							<Image
								className={styles.productImage}
								width={140}
								height={140}
								src={imageUrl}
								alt={target.product?.name || target.category?.name || target.id}
								priority
							/>
						) : (
							<ProductImage
								className={styles.productImage}
								src={imageUrl}
								width={250}
								height={250}
								size='medium'
								alt={target.product?.name || target.category?.name || target.id}
								priority
							/>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
