import React from 'react'
import Image from 'next/image'

import { Clock } from 'lucide-react'
import Markdown from 'markdown-to-jsx'

import { BackToTop, Breadcrumb } from '@/components'

import { calcNounDate } from '@/utils/calc-noun-date'
import { calcReadingTime } from '@/utils/calc-reading-time'
import { ROUTE } from '@/config/routes.config'

import type { PostType } from '@/types/post.types'

import styles from './post.module.scss'

export const Post: React.FC<PostType> = ({
	title,
	content,
	reading,
	lastModified
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
					<span className={styles.tag}>
						{`Опубликовано ${new Date(lastModified).toLocaleDateString()}`}
					</span>
					<div className={styles.tag}>
						<Clock className={styles.icon} />
						<span className={styles.text}>{reading} мин</span>
					</div>
				</div>
			</div>

			<div className={styles.content}>
				<Markdown>{content.content}</Markdown>
			</div>

			<BackToTop />
		</article>
	)
}
