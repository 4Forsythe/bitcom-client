'use client'

import React from 'react'

import { X } from 'lucide-react'
import { CSSTransition } from 'react-transition-group'

import { useModal } from '@/hooks/useModal'

import styles from './Modal.module.scss'

interface ModalProps {
	children: React.ReactNode
}

export const Modal = ({ children }: ModalProps) => {
	const { isOpen, onClose } = useModal()

	const nodeRef = React.useRef<HTMLDivElement>(null)

	return (
		<CSSTransition
			nodeRef={nodeRef}
			in={isOpen}
			timeout={300}
			unmountOnExit
			classNames={{
				enter: styles.fadeEnter,
				enterActive: styles.fadeEnterActive,
				exit: styles.fadeExit,
				exitActive: styles.fadeExitActive
			}}
		>
			<div
				ref={nodeRef}
				className={styles.container}
			>
				<div className={styles.inner}>
					<div className={styles.dialog}>{children}</div>
					<button
						className={styles.exit}
						aria-label='Свернуть модальное окно'
						onClick={onClose}
					>
						<X className={styles.icon} />
					</button>
				</div>
				<div
					className={styles.overlay}
					aria-label='Свернуть модальное окно'
					onClick={onClose}
				/>
			</div>
		</CSSTransition>
	)
}
