import clsx from 'clsx'
import { Loader2, type LucideIcon } from 'lucide-react'

import styles from './menu-button.module.scss'

export interface MenuButtonProps {
	title: string
	icon: LucideIcon
	badge?: string
	isLoading?: boolean
	onClick: VoidFunction
}

export const MenuButton: React.FC<MenuButtonProps> = ({
	title,
	icon: Icon,
	badge,
	isLoading,
	onClick
}) => {
	return (
		<button
			className={clsx(styles.container, 'animate-opacity', {
				[styles.loading]: isLoading
			})}
			onClick={onClick}
		>
			<Icon className={styles.icon} />
			<p className={styles.text}>{title}</p>
			{badge && <span className={styles.badge}>{badge}</span>}

			{isLoading && (
				<div className={styles.loader}>
					<Loader2 className={styles.icon} />
				</div>
			)}
		</button>
	)
}
