import Link from 'next/link'
import type { Metadata } from 'next'

import { Breadcrumb } from '@/components'
import { ROUTE } from '@/config/routes.config'

import styles from './buying.module.scss'

export const metadata: Metadata = {
	title: 'Покупка электроники',
	description:
		'Компания «БитКом» помогает избавиться от ненужной и устаревшей электронной техники в городе Тольятти. Обратившись к нам, вы сможете выгодно и быстро продать любые электронные комплектующие, получив за это реальные деньги. Настоящее предложение распространяется на комплектующие из прикрепленного прайс-листа.'
}

export default function BuyingPage() {
	return (
		<>
			<Breadcrumb
				value='Покупка электроники'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<div className={styles.container}>
				<p className={styles.paragraph}>
					Компьютерная техника очень быстро стареет, начинает все медленнее
					работать и не успевает за все более «тяжелым» софтом. После чего
					просто становится электронным ломом. Но это не означает, что ее надо
					просто выкинуть – можно продать платы с радиодеталями и комплектующие,
					получив реальные деньги.
				</p>
				<p className={styles.paragraph}>
					<b>
						Обратившись к нам, вы сможете выгодно продать материнскую плату от
						ПК или ноутбука.
					</b>
				</p>
				<Link
					className={styles.chip}
					href='/assets/electronic-pricelist.pdf'
					target='blank'
				>
					Скачать прайс-лист
				</Link>
			</div>
		</>
	)
}
