'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useDeleteCart } from './useDeleteCart'
import { orderService } from '@/services/order.service'
import { ROUTE } from '@/config/routes.config'

import type { PaymentStatusType } from '@/types/payment.types'
import { type OrderFormType, OrderType, PaymentType } from '@/types/order.types'

export const useCreateOrder = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	const [order, setOrder] = React.useState<OrderType & PaymentStatusType>()

	const { deleteCart } = useDeleteCart()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['create order'],
		mutationFn: (data: OrderFormType) => orderService.create(data),
		onSuccess: (response) => {
			setOrder(response)
		}
	})

	React.useEffect(() => {
		if (isSuccess && order) {
			queryClient.invalidateQueries({ queryKey: ['order-list'] })
			deleteCart()

			const returnUrl = order.confirmation?.confirmation_url

			if (order.paymentMethod === PaymentType.CARD && returnUrl) {
				router.push(returnUrl)
			}

			if (order.paymentMethod === PaymentType.CASH) {
				router.push(ROUTE.ORDERLIST)
			}
		}
	}, [isSuccess])

	return {
		createOrder: mutate,
		isCreateOrderPending: isPending,
		isCreateOrderSuccess: isSuccess,
		isCreateOrderError: isError
	}
}
