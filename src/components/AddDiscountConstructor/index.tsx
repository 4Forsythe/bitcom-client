'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import { Heading, AddDiscountForm } from '@/components'

import { discountService } from '@/services/discount.service'

import styles from './add-discount.module.scss'

export const AddDiscountConstructor: React.FC = () => {
	const searchParams = useSearchParams()
	const discountId = searchParams.get('discountId')

	const {
		data: discount,
		isLoading: isDiscountLoading,
		isSuccess: isDiscountSuccess
	} = useQuery({
		queryKey: [discountId],
		queryFn: () => discountService.getOne(discountId!),
		enabled: !!discountId
	})

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<Heading
					title={discount ? 'Изменить акцию' : 'Добавить новую акцию'}
					control
				/>
				{isDiscountLoading ? (
					<div className={styles.block}>
						<div className='w-2/5 h-[50px] bg-gray-200 rounded-md animate-pulse' />
						{[...new Array(3)].map((_, index) => (
							<div
								key={index}
								className='w-2/3 h-[120px] bg-gray-200 rounded-md animate-pulse'
							/>
						))}
					</div>
				) : (
					<AddDiscountForm discount={discount} />
				)}
			</div>
		</div>
	)
}
