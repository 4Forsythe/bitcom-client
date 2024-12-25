import React from 'react'
import Link from 'next/link'

import clsx from 'clsx'
import { SearchX } from 'lucide-react'

import { Button } from '@/components'
import { ROUTE } from '@/config/routes.config'

import styles from './empty-block.module.scss'

interface EmptyBlockProps {
	title: string
	description?: string
}

export const EmptyBlock: React.FC<EmptyBlockProps> = ({
	title,
	description
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.block}>
				<SearchX className={clsx(styles.icon, 'animate-bounce')} />
				<span className={styles.title}>{title}</span>
				<p className={styles.description}>{description}</p>
				<div className={styles.controls}>
					<Link href={ROUTE.HOME}>
						<Button variant='outlined'>На главную</Button>
					</Link>
					<Link href={ROUTE.CATALOG}>
						<Button>Каталог</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
