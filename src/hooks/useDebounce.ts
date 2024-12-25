'use client'

import React from 'react'
import debounce from 'lodash.debounce'

interface UseDebounceProps {
	value: string
	delay: number
}

export const useDebounce = ({ value, delay }: UseDebounceProps) => {
	const [query, setQuery] = React.useState(value)

	const onDebounce = React.useCallback(
		debounce((value: string) => {
			setQuery(value)
		}, delay),
		[delay]
	)

	React.useEffect(() => {
		if (value.trim()) {
			onDebounce(value)
		}
	}, [value])

	return { query }
}
