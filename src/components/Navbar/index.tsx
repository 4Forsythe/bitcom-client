'use client'

import React from 'react'
import Link from 'next/link'

import { FEATURES, NavbarItemType } from './navbar.data'
import { Carousel } from '@/components/Carousel'

import styles from './navbar.module.scss'
import Image from 'next/image'

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
				<nav className={styles.loadingItems}>
					{FEATURES.slice(0, 6).map((item) => (
						<NavbarItem
							key={item.href}
							{...item}
						/>
					))}
				</nav>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<nav className={styles.items}>
				<Carousel
					slides={FEATURES.map((item) => (
						<NavbarItem
							key={item.href}
							{...item}
						/>
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
			</nav>
		</div>
	)
}

export const NavbarItem: React.FC<NavbarItemType> = ({
	icon,
	href,
	title,
	description
}) => {
	return (
		<div
			key={title}
			className={styles.item}
		>
			<Link
				className={styles.link}
				href={href}
			>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.text}>{description}</p>
				<Image
					className={styles.icon}
					width={110}
					height={110}
					src={`/static/icons/${icon}`}
					alt={title}
					priority
				/>
			</Link>
		</div>
	)
}
