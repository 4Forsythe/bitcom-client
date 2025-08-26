type MarketplaceItemType = {
	id: string
	href: string
	imageUrl: string
}

export const MARKETPLACES: MarketplaceItemType[] = [
	{
		id: 'Авито',
		href: 'https://www.avito.ru/brands/bitcom63',
		imageUrl: '/icons/Avito.svg'
	},
	{
		id: 'Яндекс.Маркет',
		href: 'https://market.yandex.ru/business--resurstekhno-elektronika/1148896',
		imageUrl: '/icons/Yandex.Market.svg'
	},
	{
		id: 'Озон',
		href: 'https://www.ozon.ru/seller/bitkom-397371',
		imageUrl: '/icons/Ozon.svg'
	}
]
