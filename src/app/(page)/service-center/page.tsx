import type { Metadata } from 'next'

import { Breadcrumb } from '@/components'
import { ServiceCenter } from './service-center'

import { ROUTE } from '@/config/routes.config'

export const metadata: Metadata = {
	title: 'Сервисный центер',
	description:
		'Компания «БитКом» занимается ремонтом промышленного оборудования и электронной техники. Мы осуществляем ремонт, профилактику и обслуживание промышленной электроники, производственного оборудования, автоматики, строительной и офисной технки, компьютеров и ноутбуков любой сложности, а также мониторов и телевизоров в городе Тольятти.'
}

export default function ServiceCenterPage() {
	return (
		<>
			<Breadcrumb
				value='Сервисный центр'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<ServiceCenter />
		</>
	)
}
