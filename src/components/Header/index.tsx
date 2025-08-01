'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { MapPin, Sheet } from 'lucide-react'
import { ADDRESS, PHONE } from '@/constants/contacts.constants'

import { useProfile } from '@/hooks/useProfile'
import { Button, HeaderMenu, SearchBar, SearchBarSkeleton } from '@/components'

import { ROUTE } from '@/config/routes.config'

import styles from './header.module.scss'

export const Header: React.FC = () => {
	const router = useRouter()

	const { profile } = useProfile()

	const handleAddItemClick = () => {
		if (profile?.role) {
			router.push(ROUTE.ADD_PRODUCT)
		}
	}

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
						href={'https://t.me/+79277839022'}
						target='_blank'
					>
						{PHONE}
					</Link>

					<div className={styles.additional}>
						{profile?.role && (
							<Button
								className='animate-opacity'
								size='sm'
								onClick={handleAddItemClick}
							>
								Добавить товар
							</Button>
						)}
						<Link
							className={styles.prices}
							href={ROUTE.PRICES}
						>
							<Sheet className={styles.icon} />
							Прайс-листы
						</Link>
					</div>
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
