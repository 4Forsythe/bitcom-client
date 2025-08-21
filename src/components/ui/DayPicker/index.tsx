'use client'

import clsx from 'clsx'
import React from 'react'

import {
	DayPicker as ReactDayPicker,
	getDefaultClassNames
} from 'react-day-picker'
import { ru } from 'react-day-picker/locale'

import 'react-day-picker/style.css'
import styles from './day-picker.module.scss'

interface Props {
	selected: Date | undefined
	required?: boolean
	disabledDayBefore?: boolean
	onSelect: (value: Date | null) => void
	className?: string
}

export const DayPicker = React.forwardRef<HTMLDivElement, Props>(
	({ selected, required, disabledDayBefore, onSelect, className }, ref) => {
		return (
			<div
				ref={ref}
				className={clsx(styles.container, className)}
			>
				<ReactDayPicker
					animate
					mode='single'
					navLayout='around'
					locale={ru}
					required={required}
					startMonth={new Date()}
					selected={selected}
					onSelect={(date: Date | undefined) => onSelect(date || null)}
					classNames={{
						root: clsx(getDefaultClassNames().root, styles.root),
						day: styles.day,
						day_button: styles.dayButton,
						today: styles.today,
						selected: styles.selected,
						chevron: styles.chevron
					}}
					disabled={disabledDayBefore ? { before: new Date() } : undefined}
				/>
			</div>
		)
	}
)

DayPicker.displayName = 'DayPicker'
