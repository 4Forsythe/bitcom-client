'use client'

import React from 'react'

import clsx from 'clsx'
import { ChevronUp } from 'lucide-react'

export const BackToTop: React.FC = () => {
	const [isVisible, setIsVisible] = React.useState(false)

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleScrollY = () => {
		const scrollY = window.scrollY
		setIsVisible(scrollY > 200)
	}

	React.useEffect(() => {
		window.addEventListener('scroll', handleScrollY)

		return () => window.removeEventListener('scroll', handleScrollY)
	}, [])

	return (
		<div
			className={clsx(
				'm-3 bottom-3.5 right-0 opacity-0 fixed transition duration-300',
				{
					'opacity-100': isVisible
				}
			)}
		>
			<button
				className='w-14 h-14 flex items-center justify-center bg-zinc-50 border border-zinc-200 rounded-lg shadow hover:bg-zinc-100 hover:shadow-md transition duration-200'
				onClick={scrollTop}
			>
				<ChevronUp size={24} />
			</button>
		</div>
	)
}
