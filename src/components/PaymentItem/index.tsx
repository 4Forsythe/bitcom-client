import { type LucideIcon } from 'lucide-react'

import styles from './payment-item.module.scss'

interface PaymentItemProps {
	type: string
	icon: LucideIcon
}

export const PaymentItem: React.FC<PaymentItemProps> = ({
	type,
	icon: Icon
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.cover}>
				<Icon className={styles.icon} />
			</div>
			<span className={styles.title}>{type}</span>
		</div>
	)
}
