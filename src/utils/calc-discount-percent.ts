export const calcDiscountPercent = (original: number, discount: number) => {
	if (!original || original <= 0) return 0
	return Math.round(((original - discount) / original) * 100)
}
