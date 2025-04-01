import React from 'react'
import Link from 'next/link'

import clsx from 'clsx'

import { Button } from '@/components'
import { ROUTE } from '@/config/routes.config'
import { PHONE, SECOND_PHONE } from '@/constants'

import type { OrderType } from '@/types/order.types'

import styles from './thanks.module.scss'

interface IThanks {
	order: OrderType
}

export const Thanks: React.FC<IThanks> = ({ order }) => {
	return (
		<div className={styles.container}>
			<div className={clsx(styles.block, 'animate-bounce')}>
				<div className={styles.heading}>
					<h5 className={styles.title}>Ваш заказ —</h5>
					<span className={styles.orderHash}>
						{new Date(order.createdAt).getTime().toString().slice(-8)}
					</span>
				</div>

				<span className={styles.caption}>
					Обязательно запишите или сфотографируйте номер, у вас могут спросить
					его при получении заказа.
				</span>
				<div className={styles.divider} />
				<p className={styles.paragraph}>
					Благодарим вас за предварительное оформление заказа,
					<br />В ближайшее время с вами свяжутся наши специалисты из отдела
					продаж.
				</p>
				<div className={styles.divider} />
				<p className={styles.paragraph}>
					При наличии дополнительных вопросов, просьба позвонить нам или
					уточнить детали в Telegram/Whatsapp:
				</p>

				<ul className={styles.list}>
					<li className={styles.listItem}>{PHONE}</li>
					<li className={styles.listItem}>{SECOND_PHONE}</li>
				</ul>

				<div className={styles.controls}>
					<Link href={ROUTE.HOME}>
						<Button variant='outlined'>Вернутсья на главную</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
