import { ProfileSidebar } from '@/components/Profile/Sidebar'

import { Breadcrumb } from '@/components'
import { ROUTE } from '@/config/routes.config'

import styles from './dashboard.module.scss'

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
