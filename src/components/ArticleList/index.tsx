import React from 'react'
import Link from 'next/link'

import { ROUTE } from '@/config/routes.config'
import type { WP_REST_API_Page } from 'wp-types'

import styles from './article-list.module.scss'

interface Props {
	items: WP_REST_API_Page[]
}

export const ArticleList: React.FC<Props> = ({ items }) => {
	return (
		<div className={styles.container}>
			<h5 className={styles.title}>Ссылки</h5>
			<div className={styles.list}>
				{items.map((item) => (
					<Link
						key={item.slug}
						className={styles.link}
						href={`${ROUTE.ARTICLES}/${item.slug}`}
					>
						{item.title.rendered}
					</Link>
				))}
			</div>
		</div>
	)
}
