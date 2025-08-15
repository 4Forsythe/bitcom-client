'use client'

import React from 'react'
import {
	useFormContext,
	Controller,
	ControllerRenderProps,
	FieldValues,
	get
} from 'react-hook-form'

import { DayPicker, Field } from '@/components'

import styles from './form-day-picker.module.scss'
import clsx from 'clsx'
import { Calendar, OctagonAlert } from 'lucide-react'

interface IFormDayPicker {
	name: string
	label?: string
	hint?: string
	disabledDayBefore?: boolean
	className?: string
}

export const FormDayPicker: React.FC<IFormDayPicker> = ({
	name,
	label,
	hint,
	disabledDayBefore,
	className
}) => {
	const {
		control,
		formState: { errors }
	} = useFormContext()
	const error = get(errors, name)

	const [isDropdown, setIsDropdown] = React.useState(false)

	const dropdownRef = React.useRef<HTMLDivElement>(null)

	const getTimestamp = (date: Date) => {
		const day = date.toLocaleString('ru-RU', { day: 'numeric' })
		const month = date.toLocaleString('ru-RU', { month: 'short' })
		const year = date.toLocaleString('ru-RU', { year: 'numeric' })

		return `${day} ${month} ${year} г.`
	}

	React.useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdown(false)
			}
		}

		document.body.addEventListener('click', handleClick)

		return () => {
			document.body.removeEventListener('click', handleClick)
		}
	}, [])

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div
					ref={dropdownRef}
					className={styles.container}
				>
					<Field
						id={name}
						icon={Calendar}
						variant='outlined'
						type='text'
						hint={hint}
						className={styles.input}
						value={
							field.value ? getTimestamp(field.value) : getTimestamp(new Date())
						}
						onClick={() => setIsDropdown((prev) => !prev)}
						isError={error}
						readOnly
					/>

					{error && (
						<span className={styles.error}>
							<OctagonAlert size={12} /> {error.message}
						</span>
					)}

					<DayPicker
						className={clsx(styles.picker, { [styles.opened]: isDropdown })}
						selected={field.value}
						onSelect={(date) => {
							field.onChange(date)
							setIsDropdown(false)
						}}
						disabledDayBefore={disabledDayBefore}
					/>
				</div>
			)}
		/>
	)
}
