import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'

import { Source_Sans_3 } from 'next/font/google'

import { Providers } from './providers'
import { ModalProvider } from '@/contexts/ModalContext'
import { AllowCookies, Header, YandexMetrika } from '@/components'
const Footer = dynamic(() => import('@/components').then((mod) => mod.Footer))

import { SITE_NAME, SITE_DESCRIPTION } from '@/constants'

import '@/styles/main.scss'
import dynamic from 'next/dynamic'

const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID)

const sourceSans = Source_Sans_3({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	variable: '--font-source-sans',
	display: 'swap'
})

export const metadata: Metadata = {
	metadataBase: new URL(process.env.BASE_URL as string),
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
			{isAnalyticsEnabled && (
				<Script type='text/javascript'>
					{`
					(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();
					for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
					k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

					ym(${YM_ID}, "init", {
						clickmap:true,
						trackLinks:true,
						accurateTrackBounce:true,
						webvisor:true
					});   
					`}
				</Script>
			)}

			<body className={sourceSans.variable}>
				{isAnalyticsEnabled && (
					<noscript>
						<div>
							<img
								src={`https://mc.yandex.ru/watch/${YM_ID}`}
								style={{ position: 'absolute', left: '-9999px' }}
								alt=''
							/>
						</div>
					</noscript>
				)}

				<React.Suspense>
					<YandexMetrika isEnabled={isAnalyticsEnabled} />
				</React.Suspense>

				<Providers>
					<ModalProvider>
						{/* <CookieBanner /> */}
						<AllowCookies />
						<Header />
						<div className='container'>{children}</div>
						<Footer />
					</ModalProvider>
				</Providers>
			</body>
		</html>
	)
}
