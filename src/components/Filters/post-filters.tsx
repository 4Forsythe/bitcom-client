import React from 'react'

import { FiltersGroup } from './FiltersGroup'

import { ROUTE } from '@/config/routes.config'
import { POST_CATEGORIES } from './filters.data'

import styles from './filters.module.scss'

export const PostFilters: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<FiltersGroup
					path={`${ROUTE.BLOG}/`}
					title='Категории'
					items={POST_CATEGORIES}
					showmoreHref={`${ROUTE.BLOG}/`}
				/>
			</div>
		</div>
	)
}
