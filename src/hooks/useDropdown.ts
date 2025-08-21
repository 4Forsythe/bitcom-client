'use client'

import React from 'react'

export function useDropdown() {
	const [isDropdown, setIsDropdown] = React.useState(false)

	const ref = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsDropdown(false)
			}
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	})

	return { ref, isDropdown, setIsDropdown }
}
