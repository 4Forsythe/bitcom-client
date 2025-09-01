export function calcProductPriceValue(
	originalPrice: string | number,
	discountPrice: string | number | undefined
): number {
	return discountPrice ? Number(discountPrice) : Number(originalPrice)
}
