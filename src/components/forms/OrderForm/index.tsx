'use client'

import React from 'react'
import Link from 'next/link'

import { Controller, useFormContext } from 'react-hook-form'

import { OrderLocation } from '@/components'
import { FormField, InfoBlock } from '@/components/ui'

import { useUserStore } from '@/store/user'
import { useCartStore } from '@/store/cart'
import { useProfile } from '@/hooks/useProfile'
import { formatPhone } from '@/utils/format-phone'

import {
	PHONE,
	SECOND_PHONE,
	TELEGRAM_URL
} from '@/constants/contacts.constants'

import { type OrderFormType } from '@/types/order.types'

import styles from './order-form.module.scss'

export const OrderForm = () => {
	const { control } = useFormContext<OrderFormType>()

	const { isProfileLoading } = useProfile()

	const { user } = useUserStore()
	const { items } = useCartStore()

	const availableProducts = items.reduce(
		(count, item) => count + item.product.count,
		0
	)

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<div className={styles.fields}>
					<h5 className={styles.title}>Персональные данные</h5>
					<>
						{user && !user.isActive && (
							<InfoBlock variant='outlined'>
								Ваша учетная запись не активирована, поэтому при оформлении мы
								отправим вам письмо для подтверждения заказа на{' '}
								<b>{user.email}</b>.
							</InfoBlock>
						)}

						<div className={styles.field}>
							<FormField
								name='customerName.firstName'
								label='Имя*'
								className={styles.input}
								maxLength={50}
								placeholder='Ваше имя'
								isLoading={isProfileLoading}
							/>
							<FormField
								name='customerName.lastName'
								label='Фамилия*'
								className={styles.input}
								maxLength={50}
								placeholder='Ваша фамилия'
								isLoading={isProfileLoading}
							/>
							<FormField
								name='customerName.middleName'
								label='Отчество'
								className={styles.input}
								maxLength={50}
								placeholder='Ваше отчество (при наличии)'
								isLoading={isProfileLoading}
							/>
						</div>
						<div className={styles.field}>
							<Controller
								name='customerPhone'
								control={control}
								rules={{
									required: 'Заполните поле'
								}}
								render={({ field: { onChange, value } }) => (
									<FormField
										name='customerPhone'
										type='number'
										className={styles.input}
										label='Номер телефона*'
										placeholder='8 (000) 000 00-00'
										value={value}
										onChange={(event) =>
											onChange(formatPhone(event.target.value))
										}
										isLoading={isProfileLoading}
									/>
								)}
							/>
							<FormField
								name='customerEmail'
								label='E-mail*'
								className={styles.input}
								placeholder='Электронная почта'
								isLoading={isProfileLoading}
							/>
						</div>
					</>
				</div>
				<section className={styles.disclaimer}>
					<h5 className={styles.disclaimerTitle}>
						Вам перезвонит наш менеджер!
					</h5>
					<p className={styles.disclaimerText}>
						Уважаемый покупатель, при оформлении заказа мы направим информацию
						нашему свободному менеджеру. Он согласует с вами детали стоимости
						(при изменении) и/или условия доставки в ваш город или регион.
					</p>
					<p className={styles.disclaimerText}>
						По остальным вопросам обращайтесь к нам в{' '}
						<Link
							className={styles.link}
							href={TELEGRAM_URL}
						>
							Telegram
						</Link>
					</p>
					<p className={styles.disclaimerText}>
						Наши контактные номера телефонов:
					</p>
					<p className={styles.disclaimerText}>
						<b>{PHONE}</b>
						<br />
						<b>{SECOND_PHONE}</b>
					</p>
				</section>
				<OrderLocation availableProducts={availableProducts} />
				{/* <div className={styles.fields}>
					<h5 className={styles.title}>2 Способ оплаты</h5>
					<Controller
						name='paymentMethod'
						control={control}
						render={({ field }) => (
							<>
								<div className={styles.selector}>
									<Badge
										variant={
											field.value === PaymentType.CARD
												? 'contained'
												: 'outlined'
										}
										onClick={() => field.onChange(PaymentType.CARD)}
									>
										Онлайн
									</Badge>
									<Badge
										variant={
											field.value === PaymentType.CASH
												? 'contained'
												: 'outlined'
										}
										onClick={() => field.onChange(PaymentType.CASH)}
									>
										Наличными
									</Badge>
								</div>
								{field.value === PaymentType.CARD ? (
									<div className={styles.payments}>
										<PaymentItem
											type='Банковской картой'
											icon={CreditCard}
										/>
									</div>
								) : (
									<InfoBlock>
										Вы сможете получить свой заказ в магазине сразу после оплаты
									</InfoBlock>
								)}
							</>
						)}
					/>
				</div>
				<div className={styles.fields}>
					<h5 className={styles.title}>3 Способ получения</h5>
					<Controller
						name='gettingMethod'
						control={control}
						render={({ field }) => (
							<Badge
								variant={
									field.value === GettingType.PICKUP ? 'contained' : 'outlined'
								}
								onClick={() => field.onChange(GettingType.PICKUP)}
							>
								{GettingType.PICKUP}
							</Badge>
						)}
					/>
				</div> */}
			</div>
		</div>
	)
}
