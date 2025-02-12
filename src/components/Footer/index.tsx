import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { MARKETPLACES } from '@/constants/marketplaces.constants'
import { INFOS, SERVICES, CONTACTS } from './menu.data'

import styles from './footer.module.scss'

export const Footer: React.FC = () => {
	return (
		<footer className={styles.container}>
			<div className={styles.inner}>
				<nav className={styles.navbar}>
					<div className={styles.menu}>
						<h6 className={styles.title}>Информация</h6>
						<ul className={styles.list}>
							{INFOS.map((item) => (
								<li key={item.href}>
									<Link
										className={styles.item}
										href={item.href}
									>
										{item.label}
									</Link>
								</li>
							))}
							<li className={styles.marketplaces}>
								{MARKETPLACES.map((item) => (
									<Link
										key={item.id}
										className={styles.market}
										href={item.href}
									>
										<Image
											className={styles.image}
											width={100}
											height={100}
											src={item.imageUrl}
											alt={item.id}
											priority
										/>
									</Link>
								))}
							</li>
						</ul>
					</div>
					<div className={styles.menu}>
						<h6 className={styles.title}>Услуги</h6>
						<ul className={styles.list}>
							{SERVICES.map((item) => (
								<li key={item.href}>
									<Link
										className={styles.item}
										href={item.href}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.menu}>
						<h6 className={styles.title}>Контакты</h6>
						<ul className={styles.list}>
							{CONTACTS.map((item) => (
								<li key={item.href}>
									<Link
										className={styles.item}
										href={item.href}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</nav>
				<div className={styles.copyright}>
					<span className={styles.text}>
						{new Date().getFullYear()} © БИТКОМ — Все права защищены, ОГРН
						1246300005511, ИНН 6320079508
					</span>
				</div>
			</div>
		</footer>
	)
}
