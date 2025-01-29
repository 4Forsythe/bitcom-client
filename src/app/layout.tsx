import React from 'react'
import type { Metadata } from 'next'

import { Source_Sans_3 } from 'next/font/google'

import { Providers } from './providers'
import { Header, Footer, CookieBanner } from '@/components'
import { ModalProvider } from '@/contexts/ModalContext'
import { YandexMetrika } from '@/components/yandex-metrika'

import { SITE_NAME, SITE_DESCRIPTION } from '@/constants/seo.constants'

import '@/styles/main.scss'

const sourceSans = Source_Sans_3({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	variable: '--font-source-sans'
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
	icons: {
		icon: ['/favicon.ico?v=4'],
		apple: ['/apple-touch-icon.png?v=4'],
		shortcut: ['/apple-touch-icon.png']
	}
}

const isAnalyticsEnabled = !!(process.env.NODE_ENV === 'production')

export default function AppLayout({
	children
}: React.PropsWithChildren<unknown>) {
	return (
		<html lang='ru'>
			<body className={sourceSans.variable}>
				<Providers>
					<ModalProvider>
						<CookieBanner />
						<Header />
						<div className='container'>{children}</div>
						<Footer />
					</ModalProvider>
				</Providers>
			</body>
			<YandexMetrika isEnabled={isAnalyticsEnabled} />
		</html>
	)
}
