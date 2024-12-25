export const ProductCardSkeleton: React.FC = () => {
	return (
		<div className='w-full gap-3 p-6 flex bg-zinc-50 rounded-2xl shadow-md'>
			<div className='w-[200px] h-[200px] bg-gray-200 rounded-2xl animate-pulse' />
			<div className='w-6/12 gap-2 flex flex-col grow'>
				<span className='w-11/12 h-8 bg-gray-200 rounded-md animate-pulse' />
				<span className='w-2/12 h-4 bg-gray-200 rounded-md animate-pulse' />
				<span className='w-11/12 h-32 bg-gray-200 rounded-md animate-pulse' />
			</div>
			<div className='gap-2 flex flex-col items-end'>
				<span className='w-24 h-8 bg-gray-200 rounded-md animate-pulse' />
				<span className='w-40 h-8 bg-gray-200 rounded-md animate-pulse' />
			</div>
		</div>
	)
}
