'use client'

import React from 'react'

import { AuthLoginForm } from './auth-login-form'
import { AuthRegisterForm } from './auth-register-form'
import { AuthVerifyForm } from './auth-verify-form'

import styles from './auth-form.module.scss'

export enum AuthMethod {
	LOGIN = 'login',
	REGISTER = 'register',
	VERIFY = 'verify'
}

export const AuthForm: React.FC = () => {
	const [method, setMethod] = React.useState<AuthMethod>(AuthMethod.LOGIN)

	return (
		<div className={styles.container}>
			{method === AuthMethod.LOGIN && <AuthLoginForm setMethod={setMethod} />}
			{method === AuthMethod.REGISTER && (
				<AuthRegisterForm setMethod={setMethod} />
			)}
			{method === AuthMethod.VERIFY && <AuthVerifyForm />}
		</div>
	)
}
