import { ROUTE } from '@/config/routes.config'

export type NavbarItemType = {
	icon: string
	href: string
	title: string
	description: string
}

export const FEATURES: NavbarItemType[] = [
	{
		icon: 'catalog.webp',
		href: ROUTE.CATALOG,
		title: 'Каталог',
		description: 'Компьютерная, офисная техника, медицинское оборудование'
	},
	{
		icon: 'blog.webp',
		href: ROUTE.BLOG,
		title: 'Блог',
		description: 'Рассказыаем про электронщину и восстановление'
	},
	{
		icon: 'service.webp',
		href: ROUTE.SERVICE,
		title: 'Сервисный центр',
		description: 'Диагностика, ремонт и гарантия'
	},
	{
		icon: 'assembly.webp',
		href: ROUTE.ASSEMBLY,
		title: 'Сборка компьютеров',
		description: 'Индивидуальный подход, соберем под ваши требования'
	},
	{
		icon: 'buying.webp',
		href: ROUTE.BUYING,
		title: 'Покупка электроники',
		description: 'Отдадим реальные деньги за старую электронику'
	},
	{
		icon: 'upgrading.webp',
		href: ROUTE.UPGRADING,
		title: 'Обновление парка ПК',
		description: 'Апгрейдим компьютеры, принтеры, МФУ'
	}
]
