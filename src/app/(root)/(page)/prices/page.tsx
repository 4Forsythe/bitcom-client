import type { Metadata } from 'next'

import { ROUTE } from '@/config/routes.config'

import { Prices } from './prices'
import { Breadcrumb } from '@/components'

export const metadata: Metadata = {
	title: 'Прайс-листы',
	description:
		'Здесь размещены все настоящие и актуальные прайс-листы товаров и услуг компании «БитКом».'
}

export default async function PricesPage() {
	return (
		<>
			<Breadcrumb
				value='Прайс-листы'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<Prices />
		</>
	)
}
