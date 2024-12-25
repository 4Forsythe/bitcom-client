export const CartItemSkeleton: React.FC = () => {
	return (
		<div className='w-full px-6 py-7 gap-4 flex bg-gray-200 rounded-lg animate-pulse'>
			<div className='w-[115px] h-[115px] bg-gray-300 rounded-md animate-pulse' />
			<div className='w-6/12 gap-3 flex flex-col'>
				<span className='w-full h-10 bg-gray-300 rounded-md animate-pulse' />
				<span className='w-7/12 h-5 bg-gray-300 rounded-md animate-pulse' />
			</div>
			<div className='ml-auto gap-8 flex flex-col'>
				<div className='gap-0.5 flex items-center'>
					<span className='w-[40px] h-[40px] ml-auto bg-gray-300 rounded-md animate-pulse' />
					<span className='w-[40px] h-[40px] ml-auto bg-gray-300 rounded-md animate-pulse' />
				</div>
				<span className='h-7 bg-gray-300 rounded-md animate-pulse' />
			</div>
		</div>
	)
}
