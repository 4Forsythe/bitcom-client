'use client'

import React from 'react'
import Link from 'next/link'

import { Placemark, YMaps, Map } from 'react-yandex-maps'
import { Controller, useFormContext } from 'react-hook-form'

import { Badge, FormField, InfoBlock } from '@/components/ui'

import { ROUTE } from '@/config/routes.config'

import { useUserStore } from '@/store/user'
import { useCartStore } from '@/store/cart'
import { useProfile } from '@/hooks/useProfile'
import { formatPhone } from '@/utils/format-phone'

import {
	type OrderFormType,
	GettingType,
	PaymentType
} from '@/types/order.types'

import styles from './order-form.module.scss'

export const OrderForm = () => {
	const { control } = useFormContext<OrderFormType>()

	const { isProfileLoading } = useProfile()

	const { user } = useUserStore()
	const { items } = useCartStore()

	const avails = items.reduce((count, item) => count + item.product.count, 0)

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<div className={styles.fields}>
					<h5 className={styles.title}>1 Персональные данные</h5>
					{user && (
						<>
							{!user.isActive && (
								<InfoBlock>
									Ваша учетная запись не активирована, поэтому при оформлении мы
									отправим вам письмо для подтверждения заказа на{' '}
									<b>{user.email}</b>.
								</InfoBlock>
							)}

							<div className={styles.field}>
								<FormField
									name='customerName'
									label='Имя*'
									className={styles.input}
									maxLength={144}
									placeholder='Фамилия Имя Отчество'
									isLoading={isProfileLoading}
								/>
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
							</div>
							<div className={styles.field}>
								<FormField
									name='customerEmail'
									label='E-mail*'
									className={styles.input}
									placeholder='Электронная почта'
									isLoading={isProfileLoading}
								/>
							</div>
						</>
					)}

					{!user && (
						<InfoBlock>
							Для оформления заказа нужно войти или зарегистрироваться.
						</InfoBlock>
					)}
				</div>
				<div className={styles.fields}>
					<h5 className={styles.title}>2 Способ оплаты</h5>
					<Controller
						name='paymentMethod'
						control={control}
						render={({ field }) => (
							<>
								<div className={styles.selector}>
									{/* <Badge
										variant={
											field.value === PaymentType.CARD
												? 'contained'
												: 'outlined'
										}
										onClick={() => field.onChange(PaymentType.CARD)}
									>
										Онлайн
									</Badge> */}
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
								{/* {field.value === PaymentType.CARD ? (
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
								)} */}
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
					<div className={styles.getting}>
						<div className={styles.details}>
							<div className={styles.address}>
								<h5 className={styles.location}>
									Тольятти, бульвар Кулибина 6А
								</h5>
								<span className={styles.text}>
									вход со стороны магазина «БитКом»
								</span>
								<span className={styles.working}>пн-пт с 9:30 до 18:00</span>
							</div>
							<span className={styles.avails}>
								{avails ? `В наличии ${avails} шт.` : 'Нет в наличии'}
							</span>
						</div>
						<YMaps>
							<Map
								className={styles.map}
								state={{
									center: [53.534416, 49.269815],
									zoom: 15,
									behaviors: ['drag']
								}}
							>
								<Placemark
									geometry={[53.534416, 49.269815]}
									options={{
										iconLayout: 'default#image',
										iconImageHref: '/icons/Marker.svg',
										iconImageSize: [42, 42],
										iconImageOffset: [-42, -42]
									}}
								/>
							</Map>
						</YMaps>
					</div>
				</div>
				<p className={styles.policy}>
					Нажимая кнопку "Оформить заказ", Вы соглашаетесь с условиями{' '}
					<Link
						className={styles.link}
						href={ROUTE.POLICIES}
						target='_blank'
					>
						политики конфиднциальности
					</Link>
					.
				</p>
			</div>
		</div>
	)
}
