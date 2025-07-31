import React from 'react'
import dynamic from 'next/dynamic'

import { Navbar, HomeWidget, Badge, ProductCategories } from '@/components'

const AboutUs = dynamic(() => import('@/components').then((mod) => mod.AboutUs))
const BrandsGallery = dynamic(() =>
	import('@/components').then((mod) => mod.BrandsGallery)
)
const ProductGroup = dynamic(() =>
	import('@/components').then((mod) => mod.ProductGroup)
)
const PostGroup = dynamic(() =>
	import('@/components').then((mod) => mod.PostGroup)
)

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

			<div className={styles.block}>
				<ProductCategories />
			</div>

			{products.items.length >= 4 ? (
				<ProductGroup
					title='Новинки'
					items={products.items}
				/>
			) : (
				<div className={styles.showcaseInfo}>
					<span className={styles.showcaseInfoTitle}>
						Приносим извинения, у нас проходит техническая инвентаризация...
					</span>
				</div>
			)}

			{posts.length > 0 && (
				<PostGroup
					title='Интересные статьи'
					items={posts}
				/>
			)}

			<AboutUs />
			<BrandsGallery />
		</div>
	)
}
