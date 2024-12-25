import type { Metadata } from 'next'

import { Heading, Wishlist } from '@/components'

import { NO_INDEX } from '@/constants'

export const metadata: Metadata = {
	title: 'Список желаемого',
	...NO_INDEX
}

export default function WishListPage() {
	return (
		<>
			<Heading
				title='Список желаемого'
				control
			/>
			<Wishlist />
		</>
	)
}
