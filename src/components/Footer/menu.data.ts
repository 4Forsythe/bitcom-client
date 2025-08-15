import { ROUTE } from '@/config/routes.config'

import {
	PHONE,
	EMAIL,
	ADDRESS,
	SECOND_PHONE
} from '@/constants/contacts.constants'

type FooterMenuType = {
	href: string
	label: string
}

export const INFOS: FooterMenuType[] = [
	{
		href: ROUTE.ABOUT,
		label: 'О компании'
	},
	{
		href: ROUTE.PRICES,
		label: 'Прайс-листы'
	},
	{
		href: ROUTE.POLICIES,
		label: 'Политика конфиденциальности'
	}
]

export const SERVICES: FooterMenuType[] = [
	{
		href: ROUTE.SERVICE,
		label: 'Ремонт'
	},
	{
		href: ROUTE.BUYING,
		label: 'Покупка электроники'
	},
	{
		href: ROUTE.ASSEMBLY,
		label: 'Сборка ПК на заказ'
	},
	{
		href: ROUTE.UPGRADING,
		label: 'Обновление парка ПК'
	}
]

export const CONTACTS: FooterMenuType[] = [
	{
		href: `tel:${PHONE}`,
		label: `${PHONE} (с 9:30 до 18:00)`
	},
	{
		href: `tel:${SECOND_PHONE}`,
		label: SECOND_PHONE
	},
	{
		href: `mailto:${EMAIL}`,
		label: EMAIL
	},
	{
		href: 'https://yandex.ru/maps/-/CDbr724l',
		label: `${ADDRESS}, Самарская обл., 445047 (вход со стороны магазина «БИТКОМ»)`
	},
	{
		href: `${ROUTE.SERVICE}#form`,
		label: 'Оставить заявку в сервисный центр'
	}
]
