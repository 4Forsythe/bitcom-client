'use client'

import React from 'react'

type WindowSizeType = {
	width?: number
	height?: number
}

export function useWindowSize() {
	const [size, setSize] = React.useState<WindowSizeType>({
		width: undefined,
		height: undefined
	})

	React.useEffect(() => {
		const resize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight
			})
		}

		window.addEventListener('resize', resize)
		resize()

		return () => window.removeEventListener('resize', resize)
	}, [])

	return size
}
