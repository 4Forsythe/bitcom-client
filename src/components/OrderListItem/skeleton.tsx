export const OrderListItemSkeleton: React.FC = () => {
	return (
		<div className='w-full h-auto gap-2.5 flex flex-col'>
			<div className='w-full sm:w-2/3 h-[48px] bg-gray-200 rounded-lg animate-pulse' />
			<div className='w-full h-[150px] bg-gray-200 rounded-lg animate-pulse' />
		</div>
	)
}
