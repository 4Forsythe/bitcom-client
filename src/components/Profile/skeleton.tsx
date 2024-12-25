export const ProfileSkeleton: React.FC = () => {
	return (
		<div className='max-w-96 mb-3.5 gap-2.5 flex flex-col'>
			<span className='h-[120px] bg-gray-200 rounded-md animate-pulse' />
			<span className='h-[60px] bg-gray-200 rounded-md animate-pulse' />
			<span className='h-[60px] bg-gray-200 rounded-md animate-pulse' />
			<div className='mt-1.5 pl-2.5 gap-3 inline-flex items-center'>
				<span className='w-full h-[44px] bg-gray-200 rounded-md animate-pulse'></span>
			</div>
		</div>
	)
}
