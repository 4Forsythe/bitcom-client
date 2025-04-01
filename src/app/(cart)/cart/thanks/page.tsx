import type { Metadata } from 'next'

import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { Thanks } from '@/components'
import { ROUTE } from '@/config/routes.config'
import { orderService } from '@/services/order.service'

export const metadata: Metadata = {
	title: 'Спасибо за заказ!'
}

export default async function ThanksPage({
	searchParams
}: {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	const orderId = searchParams?.order

	if (!orderId) return notFound()

	const accessToken = cookies().get('ACCESS_TOKEN')?.value
	const cartToken = 'CART_TOKEN=' + cookies().get('CART_TOKEN')?.value

	const tokens = [cartToken]

	const order = await orderService.getOne(orderId.toString(), {
		cookies: tokens,
		bearer: accessToken
	})

	if (!order) redirect(ROUTE.ORDERLIST)

	return <Thanks order={order} />
}
