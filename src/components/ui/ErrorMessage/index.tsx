import React from 'react'

import styles from './ErrorMessage.module.scss'

interface IErrorMessage {
	children: React.ReactNode | string
}

export const ErrorMessage: React.FC<React.PropsWithChildren<IErrorMessage>> = ({
	children
}) => {
	return (
		<div className={styles.container}>
			<span className={styles.text}>{children}</span>
		</div>
	)
}
