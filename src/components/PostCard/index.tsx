import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { User } from 'lucide-react'

import { SERVER_BASE_URL } from '@/constants'
import { ROUTE } from '@/config/routes.config'
import { calcNounDate } from '@/utils/calc-noun-date'

import type { PostType } from '@/types/post.types'

import styles from './post-card.module.scss'

export const PostCard: React.FC<PostType> = ({
	slug,
	title,
	description,
	imageUrl,
	author,
	createdAt
}) => {
	return (
		<article className={styles.container}>
			<Link
				className={styles.cover}
				href={`${ROUTE.BLOG}/${slug}`}
			>
				<Image
					className={styles.image}
					width={1000}
					height={1000}
					src={
						imageUrl
							? `${SERVER_BASE_URL}/${imageUrl}`
							: '/static/image-placeholder.png'
					}
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
					<span className={styles.author}>
						<User className={styles.icon} />
						{author}
					</span>
					<span className={styles.timestamp}>{calcNounDate(createdAt)}</span>
				</div>
				<p className={styles.description}>{description}</p>
			</div>
		</article>
	)
}
