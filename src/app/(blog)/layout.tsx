import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: {
		default: 'Техноблог «БитКом»',
		template: '%s | Техноблог «БитКом»'
	},
	description:
		'Миниатюрный техноблог наших специалистов: обучайся разбираться в электронике, читай полезные советы, узнай как работает любимая техника и многое другое...'
}

export default function BlogLayout({
	children
}: React.PropsWithChildren<unknown>) {
	return (
		<div className='main-layout'>
			<section className='main-layout__inner'>{children}</section>
		</div>
	)
}
