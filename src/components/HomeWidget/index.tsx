import styles from './home-widget.module.scss'

interface HomeWidgetProps {
	title: string
	children: string | React.ReactNode
}

export const HomeWidget: React.FC<HomeWidgetProps> = ({ title, children }) => {
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles.inner}>{children}</div>
		</div>
	)
}
