import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { SOCIALS, EMAIL, MARKETPLACES } from '@/constants'
import { Navbar, HomeWidget, Badge, ActualOffer } from '@/components'

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

import type {
	ProductsType,
	ProductCharacteristicsType
} from '@/types/product.types'
import type { FrontmatterPostType } from '@/types/post.types'

import styles from './home.module.scss'

interface Props {
	devices: ProductCharacteristicsType
	products: ProductsType
	posts: FrontmatterPostType[]
}

export const Home: React.FC<Props> = async ({ devices, products, posts }) => {
	return (
		<div className={styles.container}>
			<Navbar />

			<div className={styles.actualInfo}>
				<div className={styles.actualContent}>
					<ActualOffer items={devices.items} />
					<ActualOffer items={devices.items} />
					<ActualOffer items={devices.items} />
					<div className={styles.contacts}>
						<HomeWidget title='Контакты'>
							<div className={styles.contactsSocials}>
								<Badge
									className={styles.item}
									href={`mailto:${EMAIL}`}
									variant='outlined'
								>
									<Image
										className={styles.icon}
										width={64}
										height={64}
										src='/icons/Mail.svg'
										alt='Почта'
										priority
									/>
								</Badge>
								{SOCIALS.map((item) => (
									<Link
										className={styles.item}
										key={item.href}
										href={item.href}
										target='_blank'
									>
										<Image
											className={styles.icon}
											width={64}
											height={64}
											src={item.imageUrl}
											alt={item.tag}
											priority
										/>
									</Link>
								))}
							</div>
						</HomeWidget>
						<HomeWidget title='Маркетплейсы'>
							<div className={styles.contactsMarketplaces}>
								{MARKETPLACES.map((item) => (
									<Badge
										className={styles.item}
										key={item.id}
										href={item.href}
										variant='outlined'
									>
										<Image
											className={styles.icon}
											width={64}
											height={64}
											src={item.imageUrl}
											alt={item.id}
											priority
										/>
									</Badge>
								))}
							</div>
						</HomeWidget>
					</div>
				</div>
			</div>

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

			<AboutUs />
			<BrandsGallery />
		</div>
	)
}
