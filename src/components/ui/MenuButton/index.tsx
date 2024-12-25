import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'

import styles from './MenuButton.module.scss'

export interface MenuButtonProps {
	title: string
	icon: LucideIcon
	badge?: string
	onClick: VoidFunction
}

export const MenuButton = ({
	title,
	icon: Icon,
	badge,
	onClick
}: MenuButtonProps) => {
	return (
		<button
			className={clsx(styles.container, 'animate-opacity')}
			onClick={onClick}
		>
			<Icon className={styles.icon} />
			<p className={styles.text}>{title}</p>
			{badge && <span className={styles.badge}>{badge}</span>}
		</button>
	)
}
