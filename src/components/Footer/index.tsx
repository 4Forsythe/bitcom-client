import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { MARKETPLACES } from '@/constants/marketplaces.constants'
import { INFOS, SERVICES, CONTACTS } from './menu.data'

import styles from './footer.module.scss'
import { SOCIALS } from '@/constants'

export const Footer: React.FC = () => {
	return (
		<footer className={styles.container}>
			<div className={styles.inner}>
				<div className={styles.navbar}>
					<nav
						className={styles.menu}
						aria-label='Навигация: общая информация'
					>
						<h3 className={styles.title}>Общая информация</h3>
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
						</ul>
						<ul className={styles.marketplaces}>
							{MARKETPLACES.map((item) => (
								<li key={item.href}>
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
								</li>
							))}
						</ul>
					</nav>
					<nav
						className={styles.menu}
						aria-label='Навигация: услуги'
					>
						<h3 className={styles.title}>Услуги</h3>
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
					</nav>
					<address className={styles.menu}>
						<h3 className={styles.title}>Контакты</h3>
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
						<ul className={styles.socials}>
							{SOCIALS.map((item) => (
								<Link
									className={styles.socialItem}
									key={item.href}
									href={item.href}
									target='_blank'
								>
									<Image
										className={styles.icon}
										width={64}
										height={64}
										src={item.imageUrl}
										alt={item.tag}
										priority
									/>
								</Link>
							))}
						</ul>
					</address>
				</div>
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
