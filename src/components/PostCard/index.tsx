import React from 'react'
import Link from 'next/link'

import { ROUTE } from '@/config/routes.config'
import { calcNounDate } from '@/utils/calc-noun-date'

import type { FrontmatterPostType } from '@/types/post.types'

import styles from './post-card.module.scss'

export const PostCard: React.FC<FrontmatterPostType> = ({
	slug,
	title,
	lastModified
}) => {
	return (
		<article className={styles.container}>
			<div className={styles.information}>
				<Link
					className={styles.title}
					href={`${ROUTE.BLOG}/${slug}`}
				>
					{title}
				</Link>
				<div className={styles.details}>
					<span className={styles.timestamp}>
						{calcNounDate(lastModified.toISOString())}
					</span>
				</div>
			</div>
		</article>
	)
}
