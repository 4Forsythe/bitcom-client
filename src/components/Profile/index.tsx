'use client'

import React from 'react'

import clsx from 'clsx'
import {
	Controller,
	FormProvider,
	useForm,
	type SubmitHandler
} from 'react-hook-form'

import { ProfileSkeleton } from './skeleton'
import { Button, Field, FormField, InfoBlock, SwitchButton } from '@/components'

import { useProfile } from '@/hooks/useProfile'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { formatPhone } from '@/utils/format-phone'
import { catchErrorMessage } from '@/api/catch-error-message'

import type { UserFormType } from '@/types/user.types'

import styles from './profile.module.scss'

export const Profile: React.FC = () => {
	const methods = useForm<UserFormType>({
		mode: 'onChange',
		defaultValues: {
			id: '',
			name: '',
			phone: '',
			email: '',
			isSubscribed: false
		}
	})

	const {
		handleSubmit,
		reset,
		control,
		formState: { isDirty, isSubmitted }
	} = methods

	const { profile, profileError, isProfileLoading, isProfileSuccess } =
		useProfile()
	const { updateProfile, isUpdateProfilePending, isUpdateProfileError } =
		useUpdateProfile()

	const message = profileError ? catchErrorMessage(profileError) : undefined

	React.useEffect(() => {
		if (profile) {
			reset({
				id: profile.id,
				name: profile.name,
				phone: profile.phone,
				email: profile.email,
				isSubscribed: profile.isSubscribed
			})
		}
	}, [isProfileSuccess])

	const onSubmit: SubmitHandler<UserFormType> = (data) => {
		console.log(data)

		updateProfile({
			name: data.name?.trim(),
			phone: data.phone,
			password: data.password?.trim() || undefined,
			isSubscribed: data.isSubscribed
		})
	}

	return (
		<div className={styles.container}>
			{isProfileLoading ? (
				<ProfileSkeleton />
			) : (
				<FormProvider {...methods}>
					<form
						className={clsx(styles.form, 'animate-opacity')}
						onSubmit={handleSubmit(onSubmit)}
					>
						<InfoBlock variant='knowledge'>
							Сейчас мы только лишь ведем разработку над этим разделом. В
							будущем появится больше информации.
						</InfoBlock>

						<div className={styles.settings}>
							{message && <span className={styles.message}>{message}</span>}
							<FormField
								name='name'
								label='Ваше имя'
								isError={isUpdateProfileError}
								isLoading={isUpdateProfilePending}
							/>
							<Controller
								name='phone'
								control={control}
								render={({ field: { onChange, value } }) => (
									<FormField
										name='phone'
										label='Номер телефона'
										value={value}
										onChange={(event) =>
											onChange(formatPhone(event.target.value))
										}
										isError={isUpdateProfileError}
										isLoading={isUpdateProfilePending}
									/>
								)}
							/>
							<FormField
								name='email'
								label='Электронная почта'
								readOnly
								disabled
							/>
							<FormField
								name='password'
								label='Сменить пароль'
								type='password'
								isError={isUpdateProfileError}
								isLoading={isUpdateProfilePending}
							/>
							<SwitchButton
								name='isSubscribed'
								label='Получать важные уведомления по почте'
							/>
						</div>

						<div className={styles.controls}>
							<Button
								variant={
									!isDirty || (!isDirty && isSubmitted)
										? 'outlined'
										: 'contained'
								}
								type='submit'
								isLoading={isUpdateProfilePending}
								disabled={!isDirty || (!isDirty && isSubmitted)}
							>
								Обновить
							</Button>
						</div>
					</form>
				</FormProvider>
			)}
		</div>
	)
}

export { ProfileSidebar } from './Sidebar'
export { ProfileSkeleton } from './skeleton'
