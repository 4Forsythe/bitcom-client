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
	onSelect: (value: Date | undefined) => void
	disabledDayBefore?: boolean
	className?: string
}

export const DayPicker = React.forwardRef<HTMLDivElement, Props>(
	({ selected, onSelect, disabledDayBefore, className }, ref) => {
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
					startMonth={new Date()}
					selected={selected}
					onSelect={(date) => onSelect(date)}
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
