import type { Metadata } from 'next'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Thanks } from '@/components'
import { ROUTE } from '@/config/routes.config'

import { userService } from '@/services/user.service'
import { orderService } from '@/services/order.service'

export const metadata: Metadata = {
	title: 'Спасибо за заказ!'
}

export default async function ThanksPage({
	searchParams
}: {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	const accessToken = cookies().get('ACCESS_TOKEN')?.value
	const user = await userService.getProfile(accessToken)

	const orderId = searchParams?.order

	if (!orderId) redirect(ROUTE.ORDERLIST)

	const order = await orderService.getOne(String(orderId), accessToken)

	if (!order) redirect(ROUTE.ORDERLIST)

	return (
		<Thanks
			user={user}
			order={order}
		/>
	)
}
