import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { Button } from '@/components'
import { ROUTE } from '@/config/routes.config'
import { PHONE, SECOND_PHONE } from '@/constants'

import type { UserType } from '@/types/user.types'
import type { OrderType } from '@/types/order.types'

import styles from './thanks.module.scss'

interface IThanks {
	user: UserType
	order: OrderType
}

export const Thanks: React.FC<IThanks> = ({ user, order }) => {
	return (
		<div className={styles.container}>
			<div className={clsx(styles.block, 'animate-bounce')}>
				<h5 className={styles.heading}>Спасибо за заказ!</h5>

				<span className={styles.caption}>
					<Image
						width={20}
						height={20}
						src='/icons/Success.svg'
						alt='Успешная операция'
					/>
					Ваш заказ был оформлен на <b>{user.email}</b>
				</span>

				<div className={styles.divider} />

				<p className={styles.paragraph}>
					Благодарим вас за{' '}
					{+order.total > 0
						? `покупку на сумму ${order.total} ₽`
						: 'предварительную покупку'}
				</p>
				<p className={styles.paragraph}>
					Детали можно посмотреть в статусе или уточнить у наших специалистов:
				</p>
				<ul className={styles.list}>
					<li className={styles.listItem}>{PHONE}</li>
					<li className={styles.listItem}>{PHONE}</li>
				</ul>

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
