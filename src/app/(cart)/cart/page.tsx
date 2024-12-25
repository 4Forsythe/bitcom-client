import type { Metadata } from 'next'

import { Heading, Cart } from '@/components'

export const metadata: Metadata = {
	title: 'Корзина товаров',
	description:
		'Просматривайте и легко управляйте товарами в вашей корзине перед оформлением заказа. Можете не переживать, все данные будут надежно сохранены у нас, просто наслаждайтесь шоппингом!'
}

export default function CartPage() {
	return (
		<>
			<Heading
				title='Корзина'
				control
			/>
			<Cart />
		</>
	)
}
