export const formatPrice = (price: number, currency: string) => {
	return `${price.toFixed(2)} ${currency}`
}

export const calculateGrossPrice = (price: number, vat: number): number => {
	return price + (price * vat) / 100
}

export const calculateNetPrice = (gross: number, vat: number): number => {
	return gross / (1 + vat / 100)
}
