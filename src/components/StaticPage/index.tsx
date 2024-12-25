import React from 'react'

import Markdown from 'markdown-to-jsx'

import { Breadcrumb } from '@/components'
import { ROUTE } from '@/config/routes.config'

import styles from './static-page.module.scss'

interface IStaticPageProps {
	title: string
	content: string
}

export const StaticPage: React.FC<IStaticPageProps> = ({ title, content }) => {
	return (
		<div className={styles.container}>
			<Breadcrumb
				value={title}
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<div className={styles.markdown}>
				<Markdown>{content}</Markdown>
			</div>
		</div>
	)
}
