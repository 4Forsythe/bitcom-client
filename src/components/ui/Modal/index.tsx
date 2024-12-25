'use client'

import React from 'react'

import { X } from 'lucide-react'

import { useModal } from '@/hooks/useModal'

import styles from './Modal.module.scss'

interface ModalProps {
	children: React.ReactNode
}

export const Modal = ({ children }: ModalProps) => {
	const { isOpen, onClose } = useModal()

	React.useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'

			return () => {
				document.body.style.overflow = 'auto'
			}
		}
	}, [isOpen])

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<div className={styles.dialog}>{children}</div>
				<button
					className={styles.exit}
					onClick={onClose}
				>
					<X className={styles.icon} />
				</button>
			</div>
			<div
				className={styles.overlay}
				onClick={onClose}
			/>
		</div>
	)
}
