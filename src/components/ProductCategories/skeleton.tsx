import React from 'react'

export const ProductCategoriesSkeleton: React.FC = () => {
	return (
		<div className='w-full gap-1.5 flex shrink flex-col'>
			<div className='w-2/3 h-8 flex bg-gray-200 rounded-lg animate-pulse' />
			<div className='w-full h-12 flex bg-gray-200 rounded-lg animate-pulse' />
		</div>
	)
}
