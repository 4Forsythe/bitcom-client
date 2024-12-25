export type CarouselSlideType = {
	id: string
	tag: string
	imageUrl: string
}

export const SLIDES: CarouselSlideType[] = [
	{
		id: '1',
		tag: 'Первый слайд',
		imageUrl: `/static/banner/1.jpg`
	},
	{
		id: '2',
		tag: 'Второй слайд',
		imageUrl: `/static/banner/2.jpg`
	}
]
