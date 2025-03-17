import React from 'react'
import Link from 'next/link'

import { File } from 'lucide-react'

import styles from './tables.module.scss'

export type ITablesItem = {
	href: string
	category: string
	sheet: Record<string, string>[]
}

interface ITables {
	items: ITablesItem[]
}

export const Tables: React.FC<ITables> = ({ items }) => {
	return (
		<div className={styles.container}>
			{items.map((table, index) => (
				<div
					className={styles.category}
					key={index}
				>
					<Link
						href={table.href}
						className={styles.categoryName}
						target='_blank'
						aria-label='Скачать файл'
					>
						<div className={styles.icon}>
							<File size={16} />
						</div>
						{table.category}
					</Link>
					<div className={styles.categoryBody}>
						<table className={styles.table}>
							<thead className={styles.tableHead}>
								<tr>
									{Object.keys(table.sheet[0] || {}).map((header, index) => (
										<th
											key={index}
											className={styles.tableCell}
										>
											{header}
										</th>
									))}
								</tr>
							</thead>
							<tbody className={styles.tableBody}>
								{table.sheet.map((row, index) => (
									<tr
										key={index}
										className={styles.tableRow}
									>
										{Object.keys(table.sheet[0] || {}).map((key) => (
											<td
												key={key}
												className={styles.tableCell}
											>
												{row[key] || ''}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			))}
		</div>
	)
}
