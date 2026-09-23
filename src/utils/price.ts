import { preciseRound } from '@/utils/index'

export const formatPrice = (price: number, currency: string) => {
	return `${price.toFixed(2)} ${currency}`
}

export const calculateGrossPrice = (price: number, vat: number): number => {
	return preciseRound(price + (price * vat) / 100, 2)
}

export const calculateNetPrice = (gross: number, vat: number): number => {
	return preciseRound(gross / (1 + vat / 100), 2)
}
