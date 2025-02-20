export default function PageLayout({
	children
}: React.PropsWithChildren<unknown>) {
	return (
		<div className='main-layout'>
			<section className='main-layout__inner'>{children}</section>
		</div>
	)
}
