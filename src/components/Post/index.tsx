'use client'

import React from 'react'
import Image from 'next/image'

import { Clock } from 'lucide-react'
import Markdown from 'markdown-to-jsx'

import { Breadcrumb } from '../Breadcrumb'

import { calcNounDate } from '@/utils/calc-noun-date'
import { calcReadingTime } from '@/utils/calc-reading-time'
import { ROUTE } from '@/config/routes.config'

import type { PostType } from '@/types/post.types'

import styles from './post.module.scss'

export const Post: React.FC<PostType> = ({
	title,
	description,
	imageUrl,
	author,
	tags,
	content,
	createdAt
}) => {
	return (
		<article className={styles.container}>
			<Breadcrumb
				value={title}
				items={[
					{ href: ROUTE.HOME, value: 'Главная' },
					{ href: ROUTE.BLOG, value: 'Блог' }
				]}
			/>
			<div className={styles.head}>
				<h1 className={styles.title}>{title}</h1>
			</div>
			<div className={styles.information}>
				<div className={styles.meta}>
					<span className={styles.tag}>{author}</span>
					<span className={styles.tag}>
						{`Опубликовано ${calcNounDate(createdAt)}`}
					</span>
					<div className={styles.tag}>
						<Clock className={styles.icon} />
						<span className={styles.text}>
							{calcReadingTime(content || description)} мин
						</span>
					</div>
					{tags.map((tag, index) => (
						<span
							key={index}
							className={styles.tag}
						>
							#{tag.toLowerCase()}
						</span>
					))}
				</div>
				{imageUrl && (
					<div className={styles.preview}>
						<Image
							className={styles.image}
							width={400}
							height={400}
							src={imageUrl}
							alt={title}
							priority
						/>
					</div>
				)}
			</div>

			{content && (
				<div className={styles.content}>
					<Markdown>{content}</Markdown>
				</div>
			)}
		</article>
	)
}
