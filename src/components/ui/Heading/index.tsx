'use client'

import { useRouter } from 'next/navigation'

import { ChevronLeft } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'

import styles from './Heading.module.scss'

interface HeadingProps {
	title: string
	control?: boolean
}

export const Heading = ({ title, control }: HeadingProps) => {
	const router = useRouter()

	const onBack = () => {
		if (window.history.length > 2) router.back()
		else router.push(ROUTE.HOME)
	}

	return (
		<div className={styles.container}>
			{control && (
				<button
					className={styles.control}
					onClick={onBack}
				>
					<ChevronLeft className={styles.icon} />
				</button>
			)}
			<h1 className={styles.title}>{title}</h1>
		</div>
	)
}
