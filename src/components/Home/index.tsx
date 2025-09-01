import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import {
	Navbar,
	ProductCategories,
	TelegramBanner,
	DiscountSlider
} from '@/components'

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
	discountProducts: ProductsType
	posts: FrontmatterPostType[]
}

export const Home: React.FC<Props> = async ({
	products,
	discountProducts,
	posts
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.block}>
				<Navbar />
			</div>

			<div className={styles.block}>
				<div className={styles.promo}>
					<div className={styles.promoInner}>
						<Image
							src='/static/LOGO.png'
							width={78}
							height={78}
							alt='Компания БитКом'
							priority
						/>
						<div className={styles.promoContent}>
							<p className={styles.promoText}>
								Обратите внимание! Весь наш каталог — это
								<br />
								тщательно проверенная Б/У техника: от принтеров, мониторов
								<br />и ноутбуков до медицинского, серверного и сетевого
								оборудования
							</p>
						</div>
					</div>
					<TelegramBanner />
				</div>
			</div>

			<React.Suspense>
				<DiscountSlider />
			</React.Suspense>

			{discountProducts.items.length >= 5 && (
				<ProductGroup
					title='Выгодные цены'
					items={discountProducts.items}
				/>
			)}
			{products.items.length >= 5 && (
				<ProductGroup
					title='Лучшие новинки'
					items={products.items}
				/>
			)}

			{discountProducts.items.length < 5 && products.items.length < 5 && (
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
