import { create } from 'zustand'

import type { UserType } from '@/types/user.types'

interface UserStateProps {
	user: UserType | null
	setUser: (data: UserType | null) => void
}

export const useUserStore = create<UserStateProps>((set) => ({
	user: null,
	setUser: (user) => set(() => ({ user }))
}))
