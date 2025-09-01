'use client'

import React from 'react'
import clsx from 'clsx'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { DiscountManagerControls, Heading } from '../ui'
import { DiscountPoster } from '../DiscountPoster'
import { DiscountCountdown } from '../DiscountCountdown'
import { ProductGroupItem, ProductGroupItemSkeleton } from '../ProductGroup'

import { productService } from '@/services/product.service'

import type { DiscountType } from '@/types/discount.types'

import styles from './discount.module.scss'

export const Discount: React.FC<DiscountType> = (props) => {
	const { id, name, targets, isArchived, startedAt, expiresAt } = props

	const firstTarget = targets[0]
	const isExpired = isArchived || new Date(expiresAt) <= new Date()

	const { data: products, isLoading: isProductsLoading } = useQuery({
		queryKey: ['discount products'],
		queryFn: () =>
			productService.getAll({
				discountId: id,
				take: 50
			}),
		placeholderData: keepPreviousData,
		enabled: !!firstTarget.product
	})

	// const { data: productCategories, isLoading: isProductCategoriesLoading } =
	// 	useQuery({
	// 		queryKey: ['discount products'],
	// 		queryFn: () =>
	// 			productService.getAll({
	// 				categoryId: firstTarget.category?.id,
	// 				take: 50
	// 			}),
	// 		placeholderData: keepPreviousData,
	// 		enabled: !!firstTarget.category
	// 	})

	const isLoading = isProductsLoading

	return (
		<div className={styles.container}>
			<div className={styles.background}>
				{isExpired && (
					<div className={styles.overlay}>
						<h5 className={styles.overlayTitle}>Акция завершилась</h5>
					</div>
				)}
				<DiscountPoster
					discount={props}
					target={firstTarget}
					variant='screen'
				/>
			</div>
			<div className={styles.inner}>
				<div className={styles.heading}>
					<div className={styles.headingInformation}>
						<Heading title={name} />
						<p className={styles.description}>
							Акция распространяется на{' '}
							{firstTarget.category
								? `всю категорию ${firstTarget.category.name}`
								: 'все товары из подборки'}
							.
						</p>
						<p className={styles.description}>
							{`Срок действия акции: с 
					${new Date(startedAt).toLocaleString(undefined, {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})} 
					до 
					${new Date(expiresAt).toLocaleString(undefined, {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})} 
					(обнуляется в 0:00 по МСК)`}
						</p>
					</div>
					<DiscountManagerControls
						discount={props}
						refreshPage
					/>
				</div>
				<div className={styles.list}>
					<div className={styles.items}>
						{isLoading
							? [...new Array(3)].map((_, index) => (
									<ProductGroupItemSkeleton key={index} />
								))
							: firstTarget.product &&
								products &&
								products.items.map((item) => {
									if (item.discount) {
										return (
											<ProductGroupItem
												key={item.id}
												{...item}
											/>
										)
									}
								})}
					</div>
					{!isLoading &&
						firstTarget.product &&
						products &&
						!products.items.length && (
							<div className={styles.empty}>
								<p className={styles.description}>
									В данный момент мы не нашли ни один товар по действующей акции
								</p>
							</div>
						)}
					<div
						className={clsx(styles.countdown, {
							[styles.expired]: isExpired
						})}
					>
						<DiscountCountdown expiresAt={new Date(expiresAt)} />
					</div>
				</div>
			</div>
		</div>
	)
}
