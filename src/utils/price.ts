export const formatPrice = (price: number, currency: string) => {
	return `${price.toFixed(2)} ${currency}`
}

export const calculateGrossPrice = (price: number, vat: number) => {
	return price + (price * vat) / 100
}
