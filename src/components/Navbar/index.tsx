'use client'

import React from 'react'
import Link from 'next/link'

import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

import { FEATURES } from './navbar.data'
import { Carousel } from '@/components/Carousel'

import styles from './navbar.module.scss'

export const Navbar: React.FC = () => {
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true)
		}
	}, [])

	if (!isMounted) {
		return (
			<div className={styles.container}>
				<div className={styles.skeleton}>
					<Loader2
						className={styles.loader}
						size={32}
					/>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<ul className={styles.items}>
				<Carousel
					slides={FEATURES.map((item) => (
						<li
							key={item.title}
							className={clsx(styles.item, 'animate-slide')}
						>
							<Link
								className={styles.link}
								href={item.href}
							>
								<h2 className={styles.title}>{item.title}</h2>
								<p className={styles.text}>{item.description}</p>
							</Link>
						</li>
					))}
					slidesPerView={6}
					spaceBetween={14}
					navigation
					breakpoints={{
						1160: {
							slidesPerView: 6
						},
						860: {
							slidesPerView: 5
						},
						630: {
							slidesPerView: 4
						},
						460: {
							slidesPerView: 3
						},
						320: {
							slidesPerView: 2
						},
						0: {
							slidesPerView: 1
						}
					}}
				/>
			</ul>
		</div>
	)
}
