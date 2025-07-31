'use client'

import React from 'react'

import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { Sidebar } from './sidebar'

import {
	CartItem,
	CartItemSkeleton,
	OrderForm,
	EmptyBlock,
	InfoBlock
} from '@/components'
import { orderSchema } from '@/schemas'

import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import { useCart } from '@/hooks/useCart'
import { useCreateOrder } from '@/hooks/useCreateOrder'

import {
	type OrderFormType,
	GettingType,
	PaymentType
} from '@/types/order.types'

import { calcNounDeclension } from '@/utils/calc-noun-declension'
import { calcDaysDifference } from '@/utils/calc-days-difference'

import styles from './cart.module.scss'

export const Cart: React.FC = () => {
	const { isCartLoading } = useCart()
	const {
		createOrder,
		isCreateOrderPending,
		isCreateOrderSuccess,
		isCreateOrderError,
		createOrderError
	} = useCreateOrder()

	const { user } = useUserStore()
	const { items, archived, createdAt } = useCartStore()

	const isTooManyOrders =
		axios.isAxiosError(createOrderError) &&
		createOrderError.response?.data.message === 'TOO_MANY_ORDERS'

	React.useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [isCreateOrderSuccess, isCreateOrderError, isTooManyOrders])

	const methods = useForm<OrderFormType>({
		mode: 'onSubmit',
		resolver: zodResolver(orderSchema),
		defaultValues: {
			customerName: {
				firstName: '',
				lastName: '',
				middleName: ''
			},
			customerEmail: '',
			customerPhone: '',
			paymentMethod: PaymentType.CASH,
			gettingMethod: GettingType.PICKUP
		}
	})

	React.useEffect(() => {
		if (user) {
			methods.reset({
				customerName: {
					firstName: user.name || '',
					lastName: '',
					middleName: ''
				},
				customerEmail: user.email || '',
				customerPhone: user.phone || '',
				paymentMethod: methods.getValues('paymentMethod'),
				gettingMethod: methods.getValues('gettingMethod')
			})
		}
	}, [user])

	const onSubmit = (data: OrderFormType) => {
		createOrder(data)
	}

	return (
		<FormProvider {...methods}>
			<form
				className={styles.container}
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<div className={styles.list}>
					{createdAt && items.length > 0 && !user && (
						<InfoBlock>
							{`Обратите внимание! Ваша корзина будет очищена через ${calcNounDeclension(calcDaysDifference(createdAt, 14), 'день', 'дня', 'дней')}. Войдите в систему, чтобы снять ограничения.`}
						</InfoBlock>
					)}
					{isTooManyOrders && (
						<InfoBlock variant='dangerous'>
							<p>
								Приносим свои извинения, но мы не можем отслеживать более 10
								активных заказов за раз.
								<br />
								Попробуйте повторить попытку <u>через 24 часа</u> после
								получения или отмены заказа по номеру телефона.
							</p>
						</InfoBlock>
					)}

					{!isCartLoading && (!items || items.length === 0) && (
						<EmptyBlock
							title='У вас пустая корзина'
							description='Вы можете найти нужный товар в каталоге или через поиск сверху.'
						/>
					)}

					{isCartLoading && (
						<div className={styles.items}>
							{[...new Array(3)].map((_, index) => (
								<CartItemSkeleton key={index} />
							))}
						</div>
					)}
					{!isCartLoading && items?.length > 0 && (
						<div className={styles.items}>
							{items.map((item) => (
								<CartItem
									key={item.id}
									{...item}
								/>
							))}
						</div>
					)}
					{!isCartLoading && archived?.length > 0 && (
						<div className={styles.items}>
							<h5 className={styles.listTitle}>В архиве</h5>
							{archived.map((item) => (
								<CartItem
									key={item.id}
									{...item}
								/>
							))}
						</div>
					)}
					{!isCartLoading && items?.length > 0 && <OrderForm />}
				</div>
				<Sidebar isPending={isCreateOrderPending} />
			</form>
		</FormProvider>
	)
}
