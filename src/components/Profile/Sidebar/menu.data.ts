import { type LucideIcon, Package, CakeSlice, User, File } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'

type SidebarMenuType = {
	href: string
	icon: LucideIcon
	label: string
}

export const PUBLIC_MENU: SidebarMenuType[] = [
	{
		href: ROUTE.PROFILE,
		icon: User,
		label: 'Настройки'
	},
	{
		href: ROUTE.ORDERLIST,
		icon: Package,
		label: 'Заказы'
	},
	{
		href: ROUTE.WISHLIST,
		icon: CakeSlice,
		label: 'Желаемое'
	}
]
