'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import clsx from 'clsx'
import { File, LogOut } from 'lucide-react'
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

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ['profile'] })
			onClose()
			setUser(null)
			router.push(ROUTE.HOME)
		}
	})

	const logout = () => {
		onOpen(
			<div className={styles.dialog}>
				<h5 className={styles.dialogTitle}>Вы точно хотите выйти?</h5>
				<div className={styles.dialogContent}>
					<Button onClick={() => mutate()}>Да, хочу</Button>
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
					{[...new Array(4)].map((_, index) => (
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
				)}
			</ul>

			<div className={styles.item}>
				<button
					className={styles.tab}
					disabled={isPending}
					onClick={logout}
				>
					<LogOut className={styles.icon} />
					Выйти
				</button>
			</div>
		</nav>
	)
}
