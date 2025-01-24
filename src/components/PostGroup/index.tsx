import React from 'react'

import { PostGroupItem } from './PostGroupItem'
import { ProductGroupItemSkeleton } from '@/components'

import type { FrontmatterPostType } from '@/types/post.types'

import styles from './post-group.module.scss'

interface IPostGroupProps {
	title: string
	items: FrontmatterPostType[]
	isLoading?: boolean
}

export const PostGroup: React.FC<IPostGroupProps> = ({
	title,
	items,
	isLoading
}) => {
	return (
		<section className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			<div className={styles.inner}>
				{isLoading
					? [...new Array(4)].map((_, index) => (
							<ProductGroupItemSkeleton key={index} />
						))
					: items &&
						items.map((item) => (
							<PostGroupItem
								key={item.slug}
								{...item}
							/>
						))}
			</div>
		</section>
	)
}

export { PostGroupItem } from './PostGroupItem'
