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
import { loginSchema } from '@/schemas'

import { useModal } from '@/hooks/useModal'
import { useUserStore } from '@/store/user'
import { authService } from '@/services/auth.service'

import type { LoginFormType } from '@/types/auth.types'

import styles from './auth-form.module.scss'

interface IAuthLoginForm {
	setMethod: (method: AuthMethod) => void
}

export const AuthLoginForm: React.FC<IAuthLoginForm> = ({ setMethod }) => {
	const { onClose } = useModal()
	const { setUser } = useUserStore()

	const methods = useForm<LoginFormType>({
		mode: 'onChange',
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const queryClient = useQueryClient()

	const { mutateAsync, isPending, isError } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: LoginFormType) => authService.login(data),
		onSuccess: async (response) => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })

			const user = response.data.user
			setUser(user)

			if (!response.data.user.isActive) {
				await authService.sendCode({
					email: user.email
				})

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

	const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
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
							name='email'
							type='text'
							placeholder='Электронная почта'
							isError={isError}
						/>
						<FormField
							name='password'
							type='password'
							placeholder='Пароль (обязательно)'
							isError={isError}
						/>
					</div>
				</div>
				<div className={styles.buttons}>
					<Button
						type='submit'
						isLoading={isPending}
					>
						Войти
					</Button>
					<Button
						type='button'
						variant='outlined'
						onClick={() => setMethod(AuthMethod.REGISTER)}
						isLoading={isPending}
					>
						Зарегистрироваться
					</Button>
				</div>
				<p className={styles.policy}>
					Нажимая кнопку "Войти", Вы соглашаетесь с условиями{' '}
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
