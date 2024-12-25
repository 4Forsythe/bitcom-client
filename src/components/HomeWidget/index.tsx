import styles from './home-widget.module.scss'

interface HomeWidgetProps {
	title: string
	children: string | React.ReactNode
}

export const HomeWidget: React.FC<HomeWidgetProps> = ({ title, children }) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.inner}>{children}</div>
		</div>
	)
}
