export const DiscountCardSkeleton: React.FC = () => {
	return (
		<div className='w-[285px] h-[165px] px-6 py-7 gap-2 flex flex-col bg-gray-100 rounded-md animate-pulse'>
			<span className='w-9/12 h-8 bg-gray-200 rounded-md animate-pulse' />
			<span className='w-full h-4 bg-gray-200 rounded-md animate-pulse' />
			<span className='w-full h-10 bg-gray-200 rounded-md animate-pulse' />
		</div>
	)
}
