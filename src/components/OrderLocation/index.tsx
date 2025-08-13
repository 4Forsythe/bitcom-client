'use client'

import React from 'react'
import Link from 'next/link'

import { ROUTE } from '@/config/routes.config'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

import styles from './order-location.module.scss'

interface Props {
	availableProducts?: string
}

export const OrderLocation: React.FC<Props> = ({ availableProducts }) => {
	return (
		<section className={styles.location}>
			<div className={styles.locationBlock}>
				<div className={styles.locationDetails}>
					<div className={styles.locationAddress}>
						<h5>Тольятти, бульвар Кулибина 6А</h5>
						<span>вход со стороны магазина «БитКом»</span>
						<span className={styles.worktime}>пн-пт с 9:30 до 18:00</span>
						<span className={styles.availables}>{availableProducts}</span>
					</div>
					<YMaps>
						<Map
							className={styles.map}
							state={{
								zoom: 15,
								center: [53.534416, 49.269815],
								behaviors: ['drag']
							}}
						>
							<Placemark
								geometry={[53.534416, 49.269815]}
								options={{
									iconLayout: 'default#image',
									iconImageHref: '/icons/Marker.svg',
									iconImageSize: [42, 42],
									iconImageOffset: [-42, -42]
								}}
							/>
						</Map>
					</YMaps>
				</div>
			</div>
			<p className={styles.policy}>
				Нажимая кнопку "Оформить заказ", Вы соглашаетесь с условиями{' '}
				<Link
					className={styles.link}
					href={ROUTE.POLICIES}
					target='_blank'
				>
					политики конфиднциальности
				</Link>{' '}
				для обработки персональных данных.
			</p>
		</section>
	)
}
