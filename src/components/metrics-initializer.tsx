'use client'

import React from 'react'

import { useIncrementViewers } from '@/hooks/useIncrementViewers'
import { useIncrementViews } from '@/hooks/useIncrementViews'

export const MetricsInitializer: React.FC = () => {
	const { incrementViewers } = useIncrementViewers()
	const { incrementViews } = useIncrementViews()

	React.useEffect(() => {
		incrementViews()

		if (sessionStorage.getItem('visit') === null) {
			incrementViewers()
		}

		sessionStorage.setItem('visit', 'X')
	}, [])

	return null
}
