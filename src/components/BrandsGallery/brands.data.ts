import type { CarouselSlideType } from '@/components/Carousel'

const files = ['Aquarius', 'Astra', 'Depo', 'Kraftway', 'Redos', 'Rosa', 'Tonk']

export const BRANDS: CarouselSlideType[] = files.map((file, index) => {
	return {
		id: String(index),
		tag: file,
		imageUrl: `static/brands/${file}.svg`
	}
})
