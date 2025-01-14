import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { Button } from '@/components'
import { ROUTE } from '@/config/routes.config'

import type { UserType } from '@/types/user.types'
import type { OrderType } from '@/types/order.types'

import styles from './thanks.module.scss'
import { PHONE, SECOND_PHONE } from '@/constants'

interface IThanks {
	user: UserType
	order: OrderType
}

export const Thanks: React.FC<IThanks> = ({ user, order }) => {
	return (
		<div className={styles.container}>
			<div className={clsx(styles.block, 'animate-bounce')}>
				<h5 className={styles.heading}>Спасибо за покупку!</h5>

				<span className={styles.caption}>
					<Image
						width={20}
						height={20}
						src='/icons/Success.svg'
						alt='Успешная операция'
					/>
					Ваш заказ был подтвержден по почте <b>{user.email}</b>
				</span>

				<div className={styles.divider} />

				<p className={styles.paragraph}>
					Благодарим вас за покупку на сумму {order.total} ₽
				</p>
				<p className={styles.paragraph}>
					Детали можно узнать в статусе или у наших специалистов —{' '}
					<b className={styles.phone}>{PHONE}</b> /{' '}
					<b className={styles.phone}>{SECOND_PHONE}</b>
				</p>

				<div className={styles.controls}>
					<Link href={ROUTE.HOME}>
						<Button variant='outlined'>На главную</Button>
					</Link>
					<Link href={ROUTE.ORDERLIST}>
						<Button>В заказы</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
