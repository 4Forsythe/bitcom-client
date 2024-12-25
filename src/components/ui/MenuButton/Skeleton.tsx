export const Skeleton = () => {
	return (
		<div className='w-[95px] h-[64px] px-1.5 py-2.5 gap-1.5 flex flex-col items-center'>
			<span className='w-2/3 h-[30px] bg-gray-200 rounded-md animate-pulse' />
			<span className='w-full h-[28px] bg-gray-200 rounded animate-pulse' />
		</div>
	)
}
