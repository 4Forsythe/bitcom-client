'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { ProductImage } from '../ProductImage'
import { DiscountPoster } from '../DiscountPoster'
import { DiscountManagerControls } from '../ui'

import { ROUTE } from '@/config/routes.config'
import { useWindowSize } from '@/hooks/useWindowSize'
import { calcNounDeclension } from '@/utils/calc-noun-declension'
import { getDiscountFirstTargetImageUrl } from '@/utils/get-discount-first-target-image-url'

import type { DiscountType } from '@/types/discount.types'

import styles from './discount-card.module.scss'

interface Props {
	discount: DiscountType
	hasManagerControls?: boolean
}

export const DiscountCard: React.FC<Props> = ({
	discount,
	hasManagerControls
}) => {
	const { id, name, targets, isArchived, startedAt, expiresAt } = discount

	const firstTarget = targets.length > 0 ? targets[0] : null

	if (!firstTarget) {
		return null
	}

	const [productsPerView, setProductsPerView] = React.useState(3)

	const { width } = useWindowSize()
	const imageUrl = getDiscountFirstTargetImageUrl(firstTarget)

	const generateTimestampString = (startedAt: string, expiresAt: string) => {
		const startDate = new Date(startedAt)
		const expiresDate = new Date(expiresAt)

		return `с ${startDate.getFullYear === expiresDate.getFullYear ? startDate.toLocaleString(undefined, { day: 'numeric', month: 'long' }) : startDate.toLocaleString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })} по ${expiresDate.toLocaleString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}`
	}

	React.useEffect(() => {
		if (width && width <= 768) {
			setProductsPerView(1)
		} else {
			setProductsPerView(3)
		}
	}, [width])

	return (
		<div className={clsx(styles.container, 'animate-opacity')}>
			<Link
				href={`${ROUTE.DISCOUNTS}/${id}`}
				className={styles.cover}
			>
				{(isArchived || new Date(expiresAt) <= new Date()) && (
					<div className={styles.overlay}>
						<h5 className={styles.overlayTitle}>В архиве</h5>
					</div>
				)}
				<DiscountPoster
					discount={discount}
					target={firstTarget}
				/>
			</Link>
			<div className={styles.inner}>
				<div className={styles.heading}>
					<div className={styles.headingInformation}>
						<Link
							href={`${ROUTE.DISCOUNTS}/${id}`}
							className={styles.title}
						>
							{name}
						</Link>
						<p className={styles.timestamp}>
							{generateTimestampString(startedAt, expiresAt)}
						</p>
					</div>
					{hasManagerControls && (
						<DiscountManagerControls
							size='small'
							discount={discount}
						/>
					)}
				</div>
				{targets.length > 0 && (
					<div className={styles.items}>
						{targets.slice(0, productsPerView).map((target) => (
							<div
								key={target.id}
								className={styles.productItem}
							>
								<Link
									href={
										target.product
											? `${ROUTE.PRODUCT}/${target.product.slug}`
											: `${ROUTE.CATALOG}/${target.category?.id}`
									}
								>
									<ProductImage
										width={80}
										height={80}
										size='extrasmall'
										src={imageUrl}
										alt={
											target.product?.name || target.category?.name || target.id
										}
									/>
								</Link>
								<div className={styles.productInformation}>
									<Link
										href={
											target.product
												? `${ROUTE.PRODUCT}/${target.product.slug}`
												: `${ROUTE.CATALOG}/${target.category?.id}`
										}
										className={styles.productTitle}
									>
										{target.product?.name || target.category?.name}
									</Link>
									{targets.length > productsPerView && (
										<Link
											href={`${ROUTE.DISCOUNTS}/${id}`}
											className={styles.othersButton}
										>
											{`Еще ${calcNounDeclension(
												targets.length - productsPerView,
												'товар',
												'товара',
												'товаров'
											)}`}
										</Link>
									)}
								</div>
							</div>
						))}
						{targets.length > productsPerView && (
							<Link
								href={`${ROUTE.DISCOUNTS}/${id}`}
								className={styles.othersLink}
							>
								{`Еще ${calcNounDeclension(
									targets.length - productsPerView,
									'товар',
									'товара',
									'товаров'
								)}`}
							</Link>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
