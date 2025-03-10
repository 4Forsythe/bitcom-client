'use client'

import clsx from 'clsx'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

import { Badge } from '@/components/ui'
import { Button } from '@/components/ui/Button'

import { useUserStore } from '@/store/user'
import { useCartStore } from '@/store/cart'
import { useDeleteCart } from '@/hooks/useDeleteCart'
import { useCreateOrder } from '@/hooks/useCreateOrder'
import { EMAIL, PHONE, SECOND_PHONE } from '@/constants/contacts.constants'

import styles from './cart.module.scss'

export const Sidebar = () => {
	const { isDeleteCartPending } = useDeleteCart()
	const { isCreateOrderPending } = useCreateOrder()

	const { user } = useUserStore()
	const { items, total } = useCartStore()

	return (
		<div className={styles.sidebar}>
			<div className={clsx(styles.block, 'animate-opacity')}>
				<div className={styles.summary}>
					<span className={styles.total}>Итого</span>
					<div className={styles.amount}>
						<span className={styles.text}>
							{items?.length > 0
								? calcNounDeclension(items.length, 'товар', 'товара', 'товаров')
								: 'Нет товаров'}
						</span>
						<div className={styles.divider} />
						<span className={styles.text}>
							{items?.length > 0
								? +total > 0
									? `${total} ₽`
									: 'Цена на месте'
								: ''}
						</span>
					</div>
				</div>
				<Button
					className={styles.action}
					variant={!user || items?.length === 0 ? 'outlined' : 'contained'}
					type='submit'
					isLoading={isCreateOrderPending || isDeleteCartPending}
					disabled={
						!user &&
						(items?.length === 0 || isCreateOrderPending || isDeleteCartPending)
					}
				>
					{!user ? 'Сначала войдите' : 'Оформить заказ'}
				</Button>
			</div>
			<Badge
				className={styles.danger}
				variant='contained'
			>
				<span className={styles.text}>
					К сожалению, на данный момент у нас отсутствуют некоторые способы
					оплаты и доставки заказов.
					<div className={styles.divider} />
					Пожалуйста, обращайтесь к нам на линию по вопросам оплаты и доставки в
					другие города:
					<div className={styles.divider} />
					<b>
						{PHONE} или {SECOND_PHONE}
					</b>
					.
					<div className={styles.divider} />
					Вы также можете написать нам на почту <b>{EMAIL}</b>.
				</span>
			</Badge>
		</div>
	)
}
