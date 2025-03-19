'use client'

import React from 'react'

import { Modal } from '@/components/ui/Modal'

interface IModalContext {
	isOpen: boolean
	onOpen: (context: React.ReactNode) => void
	onClose: () => void
}

export const ModalContext = React.createContext<IModalContext>({
	isOpen: false,
	onOpen: () => {},
	onClose: () => {}
})

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [context, setContext] = React.useState<React.ReactNode>(null)

	const onOpen = (component: React.ReactNode) => {
		setContext(component)
		setIsOpen(true)
	}

	const onClose = () => {
		setIsOpen(false)
	}

	return (
		<ModalContext.Provider value={{ isOpen, onOpen, onClose }}>
			<Modal>{context}</Modal>
			{children}
		</ModalContext.Provider>
	)
}
