'use client'

import Link from 'next/link'

import { SERVICES } from './services.data'
import { ADDRESS, PHONE, SECOND_PHONE } from '@/constants/contacts.constants'

import styles from './service-center.module.scss'

export const ServiceCenter = () => {
	return (
		<div className={styles.container}>
			<div className={styles.banner}>
				<h1 className={styles.title}>Сервисный центр</h1>
				<p className={styles.text}>
					Мы занимаемся ремонтом техники и оборудования
					<br />
					Наши опытные мастера устраняют неисправности любого уровня сложности
				</p>
				<ul className={styles.menu}>
					{SERVICES.map((service) => (
						<li className={styles.item}>
							<span className={styles.tile}>{service.name}</span>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.information}>
				<p className={styles.text}>
					Мы осуществляем ремонт, профилактику и обслуживание промышленной
					электроники, производственного оборудования, автоматики, строительной
					и офисной технки, компьютеров и ноутбуков любой сложности, а также
					мониторов и телевизоров
				</p>
				<div className={styles.contact}>
					<div className={styles.important}>
						<span className={styles.phones}>
							<Link
								className={styles.phone}
								href={`tel:${SECOND_PHONE}`}
							>
								{SECOND_PHONE}
							</Link>
							или
							<Link
								className={styles.phone}
								href={`tel:${PHONE}`}
							>
								{PHONE}
							</Link>
						</span>
						<span className={styles.worktime}>с 9:30 до 18:00</span>
					</div>
					<Link
						className={styles.address}
						href='https://yandex.ru/maps/-/CDfZBXKB'
						target='blank'
					>
						{ADDRESS}
					</Link>
				</div>
			</div>
		</div>
	)
}
