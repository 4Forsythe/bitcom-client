'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import clsx from 'clsx'
import {
	Archive,
	BadgePercent,
	Download,
	File,
	LogOut,
	PackagePlus,
	TicketPercent
} from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui'
import { ProfileSidebarSkeleton } from './skeleton'

import { PUBLIC_MENU } from './menu.data'
import { ROUTE } from '@/config/routes.config'

import { useUserStore } from '@/store/user'
import { authService } from '@/services/auth.service'
import { useModal } from '@/hooks/useModal'

import styles from './profile-sidebar.module.scss'

export const ProfileSidebar: React.FC = () => {
	const router = useRouter()
	const pathname = usePathname()

	const queryClient = useQueryClient()

	const { onOpen, onClose } = useModal()
	const { user, setUser } = useUserStore()

	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ['profile'] })
			router.replace(ROUTE.HOME)
			setUser(null)
			onClose()
		}
	})

	const logout = () => {
		onOpen(
			<div className={styles.dialog}>
				<h5 className={styles.dialogTitle}>Вы точно хотите выйти?</h5>
				<div className={styles.dialogContent}>
					<Button onClick={() => mutateLogout()}>Да, хочу</Button>
					<Button
						variant='outlined'
						onClick={onClose}
					>
						Нет, назад
					</Button>
				</div>
			</div>
		)
	}

	if (!user) {
		return (
			<div className={styles.container}>
				<div className={styles.menu}>
					{[...new Array(3)].map((_, index) => (
						<ProfileSidebarSkeleton key={index} />
					))}
				</div>
			</div>
		)
	}

	return (
		<nav className={styles.container}>
			<ul className={styles.menu}>
				{PUBLIC_MENU.map((item) => (
					<li
						key={item.href}
						className={styles.item}
					>
						<Link
							href={item.href}
							className={clsx(styles.tab, {
								[styles.target]: pathname === item.href
							})}
						>
							<item.icon className={styles.icon} />
							{item.label}
						</Link>
					</li>
				))}

				{user?.role && (
					<React.Fragment>
						<li className={styles.item}>
							<Link
								href={ROUTE.MY_DISCOUNTS}
								className={clsx(styles.tab, {
									[styles.target]: pathname === ROUTE.MY_DISCOUNTS
								})}
							>
								<BadgePercent className={styles.icon} />
								Акции
								<span className={styles.tabBadge}>Новое</span>
							</Link>
						</li>
						<li className={styles.item}>
							<Link
								href={ROUTE.ADD_DISCOUNT}
								className={clsx(styles.tab, {
									[styles.target]: pathname === ROUTE.ADD_DISCOUNT
								})}
							>
								<TicketPercent className={styles.icon} />
								Добавить акцию
								<span className={styles.tabBadge}>Новое</span>
							</Link>
						</li>
						<li className={styles.item}>
							<Link
								href={ROUTE.MY_PRODUCTS}
								className={clsx(styles.tab, {
									[styles.target]: pathname === ROUTE.MY_PRODUCTS
								})}
							>
								<Archive className={styles.icon} />
								Архив и черновики
							</Link>
						</li>
						<li className={styles.item}>
							<Link
								href={ROUTE.ADD_PRODUCT}
								className={clsx(styles.tab, {
									[styles.target]: pathname === ROUTE.ADD_PRODUCT
								})}
							>
								<PackagePlus className={styles.icon} />
								Добавить товар
							</Link>
						</li>
						<li className={styles.item}>
							<Link
								href={ROUTE.EXPORT}
								className={clsx(styles.tab, {
									[styles.target]: pathname === ROUTE.EXPORT
								})}
							>
								<Download className={styles.icon} />
								Экспорт данных
								<span className={styles.tabBadge}>Новое</span>
							</Link>
						</li>
						<li className={styles.item}>
							<Link
								href={ROUTE.UPLOAD_DOCX}
								className={clsx(styles.tab, {
									[styles.target]: pathname === ROUTE.UPLOAD_DOCX
								})}
							>
								<File className={styles.icon} />
								Загрузить статью
							</Link>
						</li>
					</React.Fragment>
				)}
			</ul>

			<div className={styles.item}>
				<button
					className={styles.tab}
					disabled={isLogoutPending}
					onClick={logout}
				>
					<LogOut className={styles.icon} />
					Выйти
				</button>
			</div>
		</nav>
	)
}
