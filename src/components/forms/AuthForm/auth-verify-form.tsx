'use client'

import React from 'react'

import toast from 'react-hot-toast'
import axios, { type AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'

import { Button, FormField } from '@/components'

import { verifySchema } from '@/schemas'

import { useModal } from '@/hooks/useModal'
import { useUserStore } from '@/store/user'
import { authService } from '@/services/auth.service'

import type { VerifyFormType } from '@/types/auth.types'

import styles from './auth-form.module.scss'

export const AuthVerifyForm: React.FC = () => {
	const { onClose } = useModal()
	const { user } = useUserStore()

	const methods = useForm<VerifyFormType>({
		mode: 'onChange',
		resolver: zodResolver(verifySchema),
		defaultValues: {
			code: ''
		}
	})

	const queryClient = useQueryClient()

	const { mutateAsync, isPending, isError } = useMutation({
		mutationKey: ['verify'],
		mutationFn: (data: VerifyFormType) =>
			authService.verify({ code: data.code, userId: user?.id as string }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			onClose()
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

	const onSubmit: SubmitHandler<VerifyFormType> = async (data) => {
		await mutateAsync(data)
	}

	return (
		<FormProvider {...methods}>
			<form
				className={styles.form}
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<div className={styles.head}>
					<span className={styles.title}>Подтвердить</span>
					<span className={styles.title}>электронную почту</span>
				</div>
				<div className={styles.inner}>
					<p className={styles.text}>
						На ваш адрес электронной почты было отправлено письмо с кодом
						подтверждения
					</p>

					<div className={styles.fields}>
						<FormField
							name='code'
							className={styles.input}
							placeholder='Введите код'
							isError={isError}
						/>
					</div>
				</div>
				<div className={styles.buttons}>
					<Button
						type='submit'
						isLoading={isPending}
					>
						Подтвердить
					</Button>
				</div>
				<p className={styles.policy}>
					Если Вам не пришло письмо с кодом подтверждения, обязательно проверьте
					ящик со спамом.
				</p>
			</form>
		</FormProvider>
	)
}
