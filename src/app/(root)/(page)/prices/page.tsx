import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ROUTE } from '@/config/routes.config'
import { cloudService } from '@/services/yandex-cloud.service'

import { Prices } from './prices'
import { Breadcrumb } from '@/components'

export const generateMetadata = async (): Promise<Metadata> => {
	const data = await getData()

	if (data) {
		return {
			title: 'Прайс-листы',
			description:
				'Здесь размещены все настоящие и актуальные прайс-листы товаров и услуг компании «БитКом».'
		}
	}

	return {}
}

async function getData() {
	try {
		const response = await cloudService.getResource('Site/Prices')
		const files = response._embedded.items
			.filter((item) => !item.name.endsWith('.txt'))
			.map((item) => ({
				href: item.file,
				name: item.name
			}))
		return files
	} catch (error) {
		console.error(error)
	}
}

export const revalidate = 3600

export default async function PricesPage() {
	const data = await getData()

	if (!data || !data.length) notFound()

	return (
		<>
			<Breadcrumb
				value='Прайс-листы'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<Prices items={data} />
		</>
	)
}
