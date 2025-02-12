import React from 'react'

import { BackToTop, Pagination, PostCard, EmptyBlock } from '@/components'

import type { FrontmatterPostType } from '@/types/post.types'

import styles from './post-list.module.scss'

interface IPostList {
	items: FrontmatterPostType[]
}

export const PostList: React.FC<IPostList> = ({ items }) => {
	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				{items.length > 0 && (
					<div className={styles.list}>
						{items.map((item) => (
							<PostCard
								key={item.slug}
								{...item}
							/>
						))}
					</div>
				)}

				{items.length === 0 && (
					<EmptyBlock title='К сожалению, ни одна статья не найдена. В скором времени мы обязательно что-нибудь напишем!' />
				)}

				{items.length > 0 && <Pagination total={items.length} />}
			</div>

			<BackToTop />
		</div>
	)
}
