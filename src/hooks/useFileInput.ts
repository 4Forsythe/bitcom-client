import React from 'react'

export function useFileInput() {
	const ref = React.useRef<HTMLInputElement>(null)

	const open = () => ref.current?.click()
	const clear = () => {
		if (ref.current) ref.current.value = ''
	}
	const getFiles = () => ref.current?.files || []

	return { ref, open, clear, getFiles }
}
