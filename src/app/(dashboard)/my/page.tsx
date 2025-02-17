import type { Metadata } from 'next'

import { Heading, Profile } from '@/components'

import { NO_INDEX } from '@/constants'

export const metadata: Metadata = {
	title: 'Личный кабинет',
	...NO_INDEX
}

export default function ProfilePage() {
	return (
		<>
			<Heading title='Настройки профиля' />
			<Profile />
		</>
	)
}
