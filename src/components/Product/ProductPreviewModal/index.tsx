'use client'

import React from 'react'
import Image from 'next/image'

import { SERVER_BASE_URL } from '@/constants'
import { useModal } from '@/hooks/useModal'

import type { ProductImageType } from '@/types/product.types'

import styles from './product-preview-modal.module.scss'
import { ProductImage } from '@/components/ProductImage'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
	targetIndex: number
	images: ProductImageType[]
	alt: string
}

export const ProductPreviewModal: React.FC<Props> = ({
	targetIndex,
	images,
	alt
}) => {
	const [targetImage, setTargetImage] = React.useState(targetIndex)
	const [errors, setErrors] = React.useState<Record<number, boolean>>({})
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

	const image = images[targetImage]
	const hasError = !!errors[targetImage]

	const handleMouseMove = (event: React.MouseEvent) => {
		if (hasError) return

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

	const handleErrorImage = (index: number) => {
		setErrors((prev) => ({ ...prev, [index]: true }))
	}

	const handleTabClick = (index: number) => {
		setTargetImage(index)
		setIsZoom(false)
	}

	const onSlidePrev = () => {
		setTargetImage((prev) => (prev - 1 >= 0 ? prev - 1 : images.length - 1))
		setIsZoom(false)
	}

	const onSlideNext = () => {
		setTargetImage((prev) => (prev + 1 >= images.length ? 0 : prev + 1))
		setIsZoom(false)
	}

	return (
		<div
			className={styles.container}
			aria-label='Свернуть модальное окно'
		>
			<div
				className={styles.frame}
				style={{ cursor: isZoom ? 'crosshair' : 'default' }}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				{images.length > 0 && !hasError ? (
					<Image
						key={image && image.url}
						className={styles.image}
						width={700}
						height={500}
						src={image && `${SERVER_BASE_URL}/${image.url}`}
						priority
						alt={alt}
						onError={() => handleErrorImage(targetImage)}
					/>
				) : (
					<div className={styles.error}>
						<span className={styles.paragraph}>
							Не удалось загрузить изображение
						</span>
					</div>
				)}

				{images.length > 0 && !hasError && isZoom && (
					<div
						className={styles.zoom}
						style={{
							top: `${cursor.y - 125}px`,
							left: `${cursor.x - 150}px`
						}}
					>
						<Image
							className={styles.zoomImage}
							width={1400}
							height={1000}
							style={{
								transformOrigin: `${zoomStyle.left} ${zoomStyle.top}`
							}}
							src={image && `${SERVER_BASE_URL}/${image.url}`}
							alt='Увеличенное изображение'
						/>
					</div>
				)}
			</div>

			{images.length > 1 && (
				<React.Fragment>
					<button
						className={clsx(styles.navButton, styles.left)}
						onClick={onSlidePrev}
					>
						<ChevronLeft
							className={styles.icon}
							size={32}
						/>
					</button>
					<button
						className={clsx(styles.navButton, styles.right)}
						onClick={onSlideNext}
					>
						<ChevronRight
							className={styles.icon}
							size={32}
						/>
					</button>
				</React.Fragment>
			)}

			{images.length > 1 && (
				<div className={styles.tabs}>
					{images.map((image, index) => (
						<ProductImage
							key={image.id}
							src={`${SERVER_BASE_URL}/${image.url}`}
							width={100}
							height={60}
							size='thumbnail'
							alt={`${alt} ${index + 1}`}
							className={clsx(styles.tab, {
								[styles.target]: targetImage === index
							})}
							onClick={() => handleTabClick(index)}
						/>
					))}
				</div>
			)}
		</div>
	)
}
