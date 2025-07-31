'use client'

import React from 'react'

import { Toaster } from 'react-hot-toast'
import { AppProgressBar } from 'next-nprogress-bar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Providers = ({ children }: React.PropsWithChildren) => {
	const [clientQuery] = React.useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<>
			<Toaster position='bottom-center' />
			<QueryClientProvider client={clientQuery}>{children}</QueryClientProvider>
			<AppProgressBar
				height='4px'
				color='#EF4444'
				options={{ showSpinner: false }}
				shallowRouting
			/>
		</>
	)
}
