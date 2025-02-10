'use client'

import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID)

export const YandexMetrika = ({ isEnabled = false }) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	React.useEffect(() => {
		const url = window.location.pathname + window.location.search

		if (!!isEnabled) {
			ym(YM_ID, 'hit', url)
		} else {
			console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url)
		}
	}, [pathname, searchParams])

	return null
}
