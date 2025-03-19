'use client'

import React from 'react'
import Image from 'next/image'

import { useModal } from '@/hooks/useModal'

import styles from './product-preview-modal.module.scss'

interface Props {
	imageUrl: string
	alt: string
}

export const ProductPreviewModal: React.FC<Props> = ({ imageUrl, alt }) => {
	const { onClose } = useModal()

	const [isZoom, setIsZoom] = React.useState(false)
	const [cursor, setCursor] = React.useState<{ x: number; y: number }>({
		x: 0,
		y: 0
	})
	const [zoomStyle, setZoomStyle] = React.useState<{
		left: string
		top: string
	}>({
		left: '50%',
		top: '50%'
	})

	const handleMouseMove = (event: React.MouseEvent) => {
		setIsZoom(true)

		const { left, top, width, height } =
			event.currentTarget.getBoundingClientRect()
		const x = event.clientX - left
		const y = event.clientY - top

		const xInPercent = (x / width) * 100
		const yInPercent = (y / height) * 100

		setCursor({ x, y })
		setZoomStyle({
			left: `${xInPercent}%`,
			top: `${yInPercent}%`
		})
	}

	const handleMouseLeave = () => {
		setIsZoom(false)
	}

	return (
		<div
			className={styles.container}
			aria-label='Свернуть модальное окно'
			onClick={onClose}
		>
			<div
				className={styles.frame}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<Image
					className={styles.image}
					width={700}
					height={500}
					src={imageUrl}
					priority
					alt={alt}
				/>

				{isZoom && (
					<div
						className={styles.zoom}
						style={{
							top: `${cursor.y - 120}px`,
							left: `${cursor.x - 200}px`
						}}
					>
						<Image
							className={styles.zoomImage}
							width={700}
							height={700}
							style={{
								transformOrigin: `${zoomStyle.left} ${zoomStyle.top}`
							}}
							src={imageUrl}
							alt='Увеличенное изображение'
						/>
					</div>
				)}
			</div>
		</div>
	)
}
