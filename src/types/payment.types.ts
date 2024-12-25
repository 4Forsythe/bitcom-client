export type PaymentStatusType = {
	id: string

	status: string
	amount: {
		value: string
		currency: string
	}
	description: string
	payment_method: {
		id: string
		type: string
	}
	confirmation: {
		confirmation_url: string
	}

	created_at: string
}
