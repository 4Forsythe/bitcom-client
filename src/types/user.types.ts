export type UserType = {
	id: string

	name?: string
	email: string
	phone?: string

	role: boolean
	isActive: boolean

	createdAt: string
	updatedAt: string
}

export type UserFormType = {
	id?: string

	name?: string
	email?: string
	phone?: string
	password?: string
}
