import React from 'react'

import {
	News,
	Navbar,
	AboutUs,
	BrandsGallery,
	MetricsTable,
	ProductGroup,
	PostGroup
} from '@/components'

import type { ProductsType } from '@/types/product.types'
import type { FrontmatterPostType } from '@/types/post.types'

import styles from './home.module.scss'

interface Props {
	products: ProductsType
	posts: FrontmatterPostType[]
}

export const Home: React.FC<Props> = async ({ products, posts }) => {
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

			{/* <MetricsTable /> */}
			<AboutUs />
			<BrandsGallery />
		</div>
	)
}
