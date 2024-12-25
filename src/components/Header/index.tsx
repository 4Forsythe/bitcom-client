import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { MapPin } from 'lucide-react'
import { ADDRESS, PHONE } from '@/constants/contacts.constants'

import { HeaderMenu, SearchBar, SearchBarSkeleton } from '@/components'

import { ROUTE } from '@/config/routes.config'

import styles from './header.module.scss'

export const Header: React.FC = () => {
	return (
		<>
			<div className={styles.roof}>
				<div className={styles.information}>
					<Link
						className={styles.link}
						href='https://yandex.ru/maps/-/CDfZBXKB'
						target='blank'
					>
						<MapPin className={styles.icon} />
						{ADDRESS}
					</Link>
					<Link
						className={styles.link}
						href='tel:88482411212'
					>
						{PHONE}
					</Link>
				</div>
			</div>
			<header className={styles.container}>
				<div className={styles.inner}>
					<div className={styles.menu}>
						<Link
							className={styles.logotype}
							href={ROUTE.HOME}
						>
							<Image
								className={styles.image}
								width={230}
								height={50}
								src='/static/bitcom-banner.png'
								alt='Logo'
								priority
							/>
						</Link>
						<div className={styles.bar}>
							<React.Suspense fallback={<SearchBarSkeleton />}>
								<SearchBar />
							</React.Suspense>
						</div>
						<HeaderMenu />
					</div>
				</div>
			</header>
		</>
	)
}
