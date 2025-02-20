import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: {
		default: 'БитКом — Полезная информация',
		template: '%s | БитКом — Полезная информация'
	},
	description:
		'Мы собрали как можно больше полезных статей и другой важной информации о нашей компании — «БитКом»'
}

export default function ArticleLayout({
	children
}: React.PropsWithChildren<unknown>) {
	return (
		<div className='main-layout'>
			<section className='main-layout__inner'>{children}</section>
		</div>
	)
}
