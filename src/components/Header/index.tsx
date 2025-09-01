'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Archive, List, MapPin, Sheet } from 'lucide-react'
import { ADDRESS, PHONE, SECOND_PHONE } from '@/constants/contacts.constants'

import { useProfile } from '@/hooks/useProfile'
import { useProductCategories } from '@/hooks/useProductCategories'
import {
	HeaderCatalog,
	HeaderMenu,
	SearchBar,
	SearchBarSkeleton
} from '@/components'

import { ROUTE } from '@/config/routes.config'

import styles from './header.module.scss'

export const Header: React.FC = () => {
	const router = useRouter()
	const catalogRef = React.useRef<HTMLButtonElement>(null)
	const [isCatalogPopup, setIsCatalogPopup] = React.useState(false)

	const { profile } = useProfile()
	const { productCategories, isProductCategoriesLoading } =
		useProductCategories(undefined, { enable: isCatalogPopup })

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
						href={'tel:+78482411212'}
						target='_blank'
					>
						{PHONE}
					</Link>
					<Link
						className={styles.link}
						href={'https://t.me/+79277839022'}
						target='_blank'
					>
						{SECOND_PHONE}
					</Link>

					<div className={styles.additional}>
						{profile?.role && (
							<button
								className={clsx(styles.additionalButton, 'animate-opacity')}
								onClick={handleAddItemClick}
							>
								<Archive className={styles.icon} />
								Добавить товар
							</button>
						)}
						<Link
							className={styles.additionalButton}
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
						<div className={styles.logotype}>
							<Link href={ROUTE.HOME}>
								<Image
									className={styles.image}
									width={230}
									height={50}
									src='/static/bitcom-banner.png'
									alt='Logo'
									priority
								/>
							</Link>
							<button
								ref={catalogRef}
								className={styles.catalogButton}
								onClick={(event) => {
									event.stopPropagation()
									setIsCatalogPopup((prev) => !prev)
								}}
							>
								<List className={styles.icon} />
								<span className={styles.catalogButtonText}>Каталог</span>
							</button>
						</div>
						<div className={styles.bar}>
							<React.Suspense fallback={<SearchBarSkeleton />}>
								<SearchBar />
							</React.Suspense>
						</div>
						<HeaderMenu />
					</div>
				</div>
				<HeaderCatalog
					buttonRef={catalogRef}
					items={productCategories?.items}
					isPopup={isCatalogPopup}
					setIsPopup={setIsCatalogPopup}
					isLoading={isProductCategoriesLoading}
				/>
			</header>
		</>
	)
}
