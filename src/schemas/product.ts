import zod from 'zod'

export const producerEnum = zod.enum([
	'Apple',
	'Samsung',
	'Sony',
	'Bosch',
	'Xiaomi',
])

export type ProducerEnum = zod.infer<typeof producerEnum>

export const categoryEnum = zod.enum([
	'Komputery',
	'Telefony',
	'RTV',
	'AGD',
	'Akcesoria',
])

export type CategoryEnum = zod.infer<typeof categoryEnum>

export const featuresEnum = zod.enum([
	'bluetooth',
	'wifi',
	'usbc',
	'waterproof',
	'ecological',
	'premium',
])

export type FeaturesEnum = zod.infer<typeof featuresEnum>

export const currencyEnum = zod.enum(['PLN', 'USD', 'EUR'])

export type CurrencyEnum = zod.infer<typeof currencyEnum>

export const productSchema = zod
	.object({
		name: zod.string(),
		sku: zod.string(),
		description: zod.string(),
		producer: producerEnum,
		category: categoryEnum,
		features: zod.array(featuresEnum),
		price: zod.number(),
		vat: zod.number().min(0).max(100),
		currency: currencyEnum,
		available: zod.boolean(),
		limited: zod.boolean(),
		minInCart: zod.number().min(0),
		maxInCart: zod.number().min(0),
	})
	.refine((data) => data.maxInCart > data.minInCart, {
		message: 'maxInCart must be greater than minInCart',
		path: ['maxInCart'],
	})

export type Product = zod.infer<typeof productSchema>
