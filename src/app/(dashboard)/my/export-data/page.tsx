import type { Metadata } from 'next'

import { ExportData, Heading } from '@/components'

import { NO_INDEX } from '@/constants'

export const metadata: Metadata = {
	title: 'Экспорт данных',
	...NO_INDEX
}

export default function ExportDataPage() {
	return (
		<>
			<Heading title='Экспорт данных' />
			<ExportData />
		</>
	)
}
