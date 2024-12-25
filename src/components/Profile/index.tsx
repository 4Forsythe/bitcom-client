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
import { Button, Field, FormField } from '@/components'

import { useProfile } from '@/hooks/useProfile'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { formatPhone } from '@/utils/format-phone'
import { catchErrorMessage } from '@/api/catch-error-message'

import type { UserFormType } from '@/types/user.types'

import styles from './profile.module.scss'

export const Profile: React.FC = () => {
	const methods = useForm<UserFormType>({
		mode: 'onChange'
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
				email: profile.email
			})
		}
	}, [isProfileSuccess])

	const onSubmit: SubmitHandler<UserFormType> = (data) => {
		updateProfile({
			name: data.name?.trim(),
			password: data.password?.trim() || undefined
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
								Сохранить изменения
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
