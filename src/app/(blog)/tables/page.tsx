import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import * as xlsx from 'xlsx'

import { ROUTE } from '@/config/routes.config'
import { cloudService } from '@/services/yandex-cloud.service'
import { getFileArrayBuffer } from '@/utils/get-file-array-buffer'

import { Breadcrumb, Tables } from '@/components'
import { type ITablesItem } from '@/components/Tables'

export const generateMetadata = async (): Promise<Metadata> => {
	const data = await getData()

	if (data) {
		return {
			title:
				'Таблицы электронных компонентов — характеристики, цены и сравнения',
			description:
				'Список таблиц электронных компонентов и мелких деталей: характеристики, спецификации, аналоги и цены. Найдите практически любые детали под свои нужды — микросхемы, резисторы, конденсаторы, транзисторы, датчики и многое другое!'
		}
	}

	return {}
}

const tableMimeType =
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

async function getData() {
	try {
		const response = await cloudService.getResource('Site/Tables')

		const files = response._embedded.items.map(async (item) => {
			if (!tableMimeType.includes(item.mime_type)) return

			const file = await getFileArrayBuffer(item.file)

			const workbook = xlsx.read(file, { type: 'buffer' })

			const sheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[sheetName]

			const data = xlsx.utils.sheet_to_json(worksheet, {
				header: 1
			}) as string[][]

			const headers = data[0].map(String)
			const maxCols = Math.max(...data.map((row) => row.length))

			while (headers.length < maxCols) {
				headers.push('')
			}

			const items = data.filter((array) => array.length > 0)

			const rows = items.slice(1).map((row) =>
				headers.reduce(
					(acc, header, index) => {
						acc[header] = row[index] ?? ''
						return acc
					},
					{} as Record<string, string>
				)
			)

			return {
				href: item.file,
				category: item.name.split('.xlsx')[0],
				sheet: rows
			} as ITablesItem
		})

		return (await Promise.all(files)).filter(
			(file): file is ITablesItem => file !== undefined
		)
	} catch (error) {
		console.error(error)
		return []
	}
}

export const revalidate = 3600

export default async function TablesPage() {
	const data = await getData()

	if (!data || !data.length) notFound()

	return (
		<>
			<Breadcrumb
				value='Таблицы'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<Tables items={data} />
		</>
	)
}
