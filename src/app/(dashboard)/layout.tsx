import { ProfileSidebar } from '@/components/Profile/Sidebar'

import styles from './dashboard.module.scss'

export default function DashboardLayout({
	children
}: React.PropsWithChildren<unknown>) {
	return (
		<div className={styles.container}>
			<div className={styles.aside}>
				<ProfileSidebar />
			</div>
			<div className={styles.inner}>{children}</div>
		</div>
	)
}
