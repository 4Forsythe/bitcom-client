import type { Metadata } from 'next'

import { ProfileSidebar } from '@/components/Profile/Sidebar'

import { Breadcrumb } from '@/components'
import { ROUTE } from '@/config/routes.config'

import styles from './dashboard.module.scss'

export const metadata: Metadata = {
	title: {
		default: 'БитКом — Личный кабинет',
		template: '%s | БитКом — Личный кабинет'
	}
}

export default function DashboardLayout({
	children
}: React.PropsWithChildren<unknown>) {
	return (
		<>
			<Breadcrumb
				value='Личный кабинет'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<div className={styles.container}>
				<div className={styles.aside}>
					<ProfileSidebar />
				</div>
				<div className={styles.inner}>{children}</div>
			</div>
		</>
	)
}
