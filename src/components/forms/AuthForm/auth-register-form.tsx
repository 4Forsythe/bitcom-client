'use client'

import React from 'react'
import Link from 'next/link'

import toast from 'react-hot-toast'
import axios, { type AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'

import { AuthMethod, Button, FormField } from '@/components'

import { ROUTE } from '@/config/routes.config'
import { registerSchema } from '@/schemas'

import { useModal } from '@/hooks/useModal'
import { useUserStore } from '@/store/user'
import { authService } from '@/services/auth.service'

import type { RegisterFormType } from '@/types/auth.types'

import styles from './auth-form.module.scss'

interface IAuthRegisterForm {
	setMethod: (method: AuthMethod) => void
}

export const AuthRegisterForm: React.FC<IAuthRegisterForm> = ({
	setMethod
}) => {
	const { onClose } = useModal()
	const { setUser } = useUserStore()

	const methods = useForm<RegisterFormType>({
		mode: 'onChange',
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	})

	const queryClient = useQueryClient()

	const { mutateAsync, isPending, isError } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: RegisterFormType) => authService.register(data),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			setUser(response.data.user)

			if (!response.data.user.isActive) {
				setMethod(AuthMethod.VERIFY)
			} else {
				onClose()
			}
		},
		onError: (error: AxiosError) => {
			if (axios.isAxiosError(error) && error.response?.data) {
				const message =
					(error.response.data as { message?: string }).message || error.message

				toast.error(message, { duration: 5000, position: 'top-center' })
			} else {
				toast.error('Произошла неизвестная ошибка', {
					duration: 5000,
					position: 'top-center'
				})
			}
		}
	})

	const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
		await mutateAsync(data)
	}

	return (
		<FormProvider {...methods}>
			<form
				className={styles.form}
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<div className={styles.head}>
					<span className={styles.title}>Войти или</span>
					<span className={styles.title}>зарегистрироваться</span>
				</div>
				<div className={styles.inner}>
					<div className={styles.fields}>
						<FormField
							name='name'
							className={styles.input}
							type='text'
							placeholder='Имя (необязательно)'
							isError={isError}
						/>
						<FormField
							name='email'
							className={styles.input}
							type='text'
							placeholder='Электронная почта'
							isError={isError}
						/>
						<FormField
							name='password'
							className={styles.input}
							type='password'
							placeholder='Пароль (обязательно)'
							isError={isError}
						/>
						<FormField
							name='confirmPassword'
							className={styles.input}
							type='password'
							placeholder='Повторить пароль'
							isError={isError}
						/>
					</div>
				</div>
				<div className={styles.buttons}>
					<Button
						type='submit'
						isLoading={isPending}
					>
						Зарегистрироваться
					</Button>
					<Button
						type='button'
						variant='outlined'
						onClick={() => setMethod(AuthMethod.LOGIN)}
						isLoading={isPending}
					>
						Войти
					</Button>
				</div>
				<p className={styles.policy}>
					Нажимая кнопку "Зарегистрироваться", Вы соглашаетесь с условиями{' '}
					<Link
						className={styles.link}
						href={ROUTE.POLICIES}
						target='_blank'
					>
						политики конфиднциальности.
					</Link>
				</p>
			</form>
		</FormProvider>
	)
}
