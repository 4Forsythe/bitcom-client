'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import ym, { YMInitializer } from 'react-yandex-metrika'

const YM_COUNTER_ID = process.env.YM_COUNTER_ID

interface Props {
	isEnabled?: boolean
}

export const YandexMetrika: React.FC<Props> = ({ isEnabled }) => {
	const pathname = usePathname()

	const hit = React.useCallback(
		(url: string) => {
			if (isEnabled) {
				ym('hit', url)
			} else {
				console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url)
			}
		},
		[isEnabled]
	)

	React.useEffect(() => {
		hit(window.location.pathname + window.location.search)
	}, [pathname, hit])

	if (!YM_COUNTER_ID || !isEnabled) {
		return null
	}

	return (
		<YMInitializer
			version='2'
			accounts={[+YM_COUNTER_ID]}
			options={{
				defer: true,
				webvisor: true,
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true
			}}
		/>
	)
}
