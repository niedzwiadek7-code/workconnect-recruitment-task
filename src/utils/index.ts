export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms))

export const preciseRound = (num: number, precision: number = 0) =>
	Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
