import React from 'react'
import Image from 'next/image'

import { Clock } from 'lucide-react'
import Markdown from 'markdown-to-jsx'
import sanitizeHtml from 'sanitize-html'

import { ROUTE } from '@/config/routes.config'
import { BackToTop, Breadcrumb } from '@/components'
import { calcReadingTime } from '@/utils/calc-reading-time'

import type { WP_REST_API_Page } from 'wp-types'

import styles from './post.module.scss'

export const StaticPage: React.FC<WP_REST_API_Page> = ({
	title,
	content,
	modified
}) => {
	const reading = calcReadingTime(content.rendered)
	const cleanHtml = sanitizeHtml(content.rendered)
	const readyHtml = cleanHtml.replace(/ class=/g, ' className=')

	return (
		<article className={styles.container}>
			<Breadcrumb
				value={title.rendered}
				items={[
					{ href: ROUTE.HOME, value: 'Главная' },
					{ href: ROUTE.ARTICLES, value: 'Информация' }
				]}
			/>

			<div className={styles.head}>
				<h1 className={styles.title}>{title.rendered}</h1>
			</div>

			<div className={styles.information}>
				<div className={styles.meta}>
					<span className={styles.tag}>
						{`Опубликовано ${new Date(modified).toLocaleDateString()}`}
					</span>
					<div className={styles.tag}>
						<Clock className={styles.icon} />
						<span className={styles.text}>{reading} мин</span>
					</div>
				</div>
			</div>

			<div className={styles.content}>
				<Markdown>{readyHtml}</Markdown>
			</div>

			<BackToTop />
		</article>
	)
}
