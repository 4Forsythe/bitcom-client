export const ProductGroupItemSkeleton: React.FC = () => {
	return (
		<div className='w-[220px] h-[244px] gap-3.5 flex flex-col'>
			<div className='w-full h-full bg-gray-200 rounded-md animate-pulse'></div>
			<span className='w-full h-10 bg-gray-200 rounded-md animate-pulse' />
		</div>
	)
}
