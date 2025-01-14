'use client'

import React from 'react'

import { MailX } from 'lucide-react'

import { Button } from '@/components'
import { useModal } from '@/hooks/useModal'
import { useUserStore } from '@/store/user'

import styles from './verify-order-modal.module.scss'

export const VerifyOrderModal: React.FC = () => {
	const { onClose } = useModal()
	const { user } = useUserStore()

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<MailX size={36} />
				<span className={styles.title}>Ваш E-mail не подтвержден!</span>
			</div>

			<p className={styles.description}>
				В целях вашей же безопасности, мы оформляем заказы только для
				подтвержденных пользователей.
			</p>
			{user ? (
				<p className={styles.description}>
					Пожалуйста, подтвердите создание нового заказа в письме, отправленном
					на <b>{user?.email}</b>.
				</p>
			) : (
				<p className={styles.description}>
					Пожалуйста, подтвердите создание нового заказа в письме, который мы
					отправили вам на почту.
				</p>
			)}

			<div className={styles.controls}>
				<Button
					variant='outlined'
					onClick={onClose}
				>
					Все понятно
				</Button>
			</div>
		</div>
	)
}
