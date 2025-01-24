import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { calcNounDate } from '@/utils/calc-noun-date'
import { ROUTE } from '@/config/routes.config'

import type { FrontmatterPostType } from '@/types/post.types'

import styles from './post-group-item.module.scss'

export const PostGroupItem: React.FC<FrontmatterPostType> = ({
	slug,
	title,
	lastModified
}) => {
	return (
		<article className={clsx(styles.container, 'animate-bounce')}>
			<Link
				className={styles.cover}
				href={`${ROUTE.BLOG}/${slug}`}
			>
				<Image
					className={styles.image}
					width={200}
					height={200}
					src={'/static/image-placeholder.png'}
					blurDataURL='/static/image-placeholder.png'
					placeholder='blur'
					alt={title}
					priority
				/>
			</Link>
			<div className={styles.information}>
				<Link
					className={styles.title}
					href={`${ROUTE.BLOG}/${slug}`}
				>
					{title}
				</Link>
				<div className={styles.details}>
					<span className={styles.text}>
						{calcNounDate(lastModified.toISOString())}
					</span>
				</div>
			</div>
		</article>
	)
}
