'use server'

import React from 'react'

import {
	News,
	Navbar,
	AboutUs,
	MetricsTable,
	ProductGroup,
	PostGroup
} from '@/components'

import { productService } from '@/services/product.service'

import styles from './home.module.scss'
import { getPostMetadata } from '@/utils/get-post-metadata'

export const Home: React.FC = async () => {
	const posts = getPostMetadata({ take: 8 })
	const products = await productService.getAll({ take: 8 })

	return (
		<div className={styles.container}>
			<Navbar />
			<News />

			{products.items.length > 0 && (
				<ProductGroup
					title='Новинки'
					items={products.items}
				/>
			)}

			{posts.length > 0 && (
				<PostGroup
					title='Интересные статьи'
					items={posts}
				/>
			)}

			<MetricsTable />
			<AboutUs />
		</div>
	)
}
