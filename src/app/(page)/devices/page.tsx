import { cache } from 'react'
import { DeviceList, Breadcrumb } from '@/components'

import { ROUTE } from '@/config/routes.config'
import { deviceService } from '@/services/device.service'

import type { ProductCharacteristicParamsType } from '@/types/product.types'

const getDevices = cache(async (params?: ProductCharacteristicParamsType) => {
	return deviceService.getAll(params)
})

export const generateMetadata = async () => {
	const data = await getDevices({ take: 20 })

	if (!data || data.items.length === 0) {
		return {
			title: 'Каталог устройств'
		}
	}

	return {
		title: 'Каталог устройств',
		description: `Компания «БитКом» предоставляет широкий выбор устройств для офиса и дома: ${data.items}. Всего ${data.count} шт. Наш каталог обновляется регулярно, и вы всегда сможете найти самые актуальные предложения и новинки. Кроме того, у нас всегда есть выгодные акции и скидки по разным позициям! Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
}

export const revalidate = 60

export default async function DevicesPage() {
	const devices = await getDevices()

	return (
		<>
			<Breadcrumb
				value='Устройства'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<DeviceList {...devices} />
		</>
	)
}
