'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { Wrench } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { SERVICES } from './services.data'
import { ROUTE } from '@/config/routes.config'
import { Button, FormField, FormTextArea, InfoBlock } from '@/components'
import { ADDRESS, PHONE, SECOND_PHONE } from '@/constants/contacts.constants'

import { useProfile } from '@/hooks/useProfile'
import { useSendServiceRequest } from '@/hooks/useSendServiceRequest'
import { serviceCenterFormSchema } from '@/schemas'
import { formatPhone } from '@/utils/format-phone'

import type { ServiceCenterFormType } from '@/types/service-center-form.types'

import styles from './service-center.module.scss'

export const ServiceCenter = () => {
	const [isSubmitted, setIsSubmitted] = React.useState(false)

	const methods = useForm<ServiceCenterFormType>({
		mode: 'onSubmit',
		resolver: zodResolver(serviceCenterFormSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			request: '',
			comment: ''
		}
	})

	const { profile, isProfileLoading, isProfileSuccess } = useProfile()
	const {
		mutate: sendServiceRequest,
		isPending,
		isSuccess,
		isError
	} = useSendServiceRequest()

	React.useEffect(() => {
		if (profile && isProfileSuccess) {
			methods.reset({
				name: profile.name || '',
				email: profile.email,
				phone: profile.phone || ''
			})
		}
	}, [profile, isProfileSuccess])

	React.useEffect(() => {
		if (isSuccess) {
			setIsSubmitted(true)
		}
		if (isError) {
			toast.error('Возникла проблема при создании заявки')
		}
	}, [isSuccess, isError])

	const onSubmit = (data: ServiceCenterFormType) => {
		sendServiceRequest(data)
	}

	return (
		<div className={styles.container}>
			<div className={styles.banner}>
				<h1 className={styles.title}>Сервисный центр</h1>
				<p className={styles.text}>
					Мы занимаемся ремонтом техники и оборудования
					<br />
					Наши опытные мастера устраняют неисправности любого уровня сложности
				</p>
				<ul className={styles.menu}>
					{SERVICES.map((service, index) => (
						<li
							className={styles.item}
							key={index}
						>
							<span className={styles.tile}>{service.name}</span>
						</li>
					))}
				</ul>
				<div className={styles.background}>
					<Wrench
						className={styles.backgroundIcon}
						size={120}
					/>
				</div>
			</div>
			<div
				id='form'
				className={styles.information}
			>
				<p className={styles.text}>
					Мы осуществляем ремонт, профилактику и обслуживание промышленной
					электроники, производственного оборудования, автоматики, строительной
					и офисной технки, компьютеров и ноутбуков любой сложности, а также
					мониторов и телевизоров.
				</p>
				<div className={styles.contact}>
					<div className={styles.important}>
						<span className={styles.phones}>
							<Link
								className={styles.phone}
								href={`tel:${SECOND_PHONE}`}
							>
								{SECOND_PHONE}
							</Link>
							или
							<Link
								className={styles.phone}
								href={`tel:${PHONE}`}
							>
								{PHONE}
							</Link>
						</span>
						<span className={styles.worktime}>с 9:30 до 18:00</span>
					</div>
					<Link
						className={styles.address}
						href='https://yandex.ru/maps/-/CDfZBXKB'
						target='blank'
					>
						{ADDRESS}
					</Link>
				</div>

				{!isSubmitted ? (
					<FormProvider {...methods}>
						<form
							className={styles.form}
							onSubmit={methods.handleSubmit(onSubmit)}
						>
							<div className={styles.formHeading}>
								<h5 className={styles.title}>Оставить заявку онлайн</h5>
								<p className={styles.text}>
									Если вам некогда заходить в наш сервисный центр физически, вы
									можете оставить онлайн-заявку на рассмотрение нашим мастерам
									по ремонту и обслуживанию.
								</p>
								<p className={styles.text}>
									В течение суток мы обработаем вашу заявку и перезвоним на
									контактный номер телефона, или отправим письмо на почту.
								</p>
							</div>
							<div className={styles.fields}>
								<div className={styles.field}>
									<FormField
										name='name'
										label='Как к вам обращаться?'
										placeholder='Ваше имя'
										maxLength={50}
										className={styles.smallInput}
										isLoading={isProfileLoading}
									/>
								</div>
								<div className={styles.field}>
									<Controller
										name='phone'
										control={methods.control}
										rules={{
											required: 'Заполните поле'
										}}
										render={({ field: { onChange, value } }) => (
											<FormField
												name='phone'
												type='number'
												label='Номер телефона*'
												className={styles.smallInput}
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
										name='email'
										label='E-mail*'
										className={styles.smallInput}
										placeholder='Электронная почта'
										isLoading={isProfileLoading}
									/>
								</div>
								<div className={styles.field}>
									<FormField
										name='request'
										label='Причина обращения*'
										placeholder='Опишите вашу проблему или причину обращения'
										className={styles.input}
									/>
								</div>
								<div className={styles.field}>
									<FormTextArea
										name='comment'
										label='Комментарий для мастера (по-желанию)'
										className={styles.input}
									/>
								</div>
							</div>

							<Button
								className={styles.submit}
								type='submit'
								isLoading={isProfileLoading || isPending}
							>
								Отправить заявку
							</Button>

							<p className={styles.policy}>
								Нажимая кнопку "Отправить заявку", Вы соглашаетесь с условиями{' '}
								<Link
									className={styles.link}
									href={ROUTE.POLICIES}
									target='_blank'
								>
									политики конфиднциальности
								</Link>{' '}
								для обработки персональных данных.
							</p>
						</form>
					</FormProvider>
				) : (
					<InfoBlock
						className={clsx(styles.infoblock, 'animate-bounce')}
						variant='successfull'
					>
						Ваша заявка была успешно создана. В течение суток на связь выйдет
						наш менеджер.
					</InfoBlock>
				)}
			</div>
		</div>
	)
}
