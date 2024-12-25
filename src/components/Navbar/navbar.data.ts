import { ROUTE } from '@/config/routes.config'

type FeaturesType = {
	href: string
	title: string
	description: string
}

export const FEATURES: FeaturesType[] = [
	{
		href: ROUTE.CATALOG,
		title: 'Каталог',
		description:
			'Компьютерная, офисная техника, медицинское и электронное оборудование'
	},
	{
		href: ROUTE.BLOG,
		title: 'Блог',
		description:
			'Наш тематический уголок с интересными событиями в мире электронной техники'
	},
	{
		href: ROUTE.SERVICE,
		title: 'Сервисный центр',
		description: 'Занимаемся ремонтом промышленной электроники и компьютерами'
	},
	{
		href: ROUTE.ASSEMBLY,
		title: 'Сборка компьютеров',
		description:
			'Как из абсолютно новых, так и из восстановленных Б/У комплектующих'
	},
	{
		href: ROUTE.BUYING,
		title: 'Покупка электроники',
		description: 'Отдадим реальные деньги за ненужные электронные комплектующие'
	},
	{
		href: ROUTE.UPGRADING,
		title: 'Обновление парка ПК',
		description: 'Полная или частичная замена парка организационной техники'
	}
]
