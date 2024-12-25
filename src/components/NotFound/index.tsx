import React from 'react'
import Link from 'next/link'

import { Button } from '@/components'
import { ROUTE } from '@/config/routes.config'

import styles from './not-found.module.scss'

export const NotFound: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<span className={styles.super}>404</span>
				<h1 className={styles.title}>Страница не найдена</h1>
				<div className={styles.action}>
					<Link href={ROUTE.HOME}>
						<Button variant='outlined'>Вернуться на главную</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
