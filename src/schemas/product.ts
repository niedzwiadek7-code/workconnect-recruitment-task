import zod from 'zod'

export const producerEnum = zod.enum([
	'apple',
	'samsung',
	'sony',
	'bosch',
	'xiaomi',
])

export type ProducerEnum = zod.infer<typeof producerEnum>

export const categoryEnum = zod.enum([
	'computers',
	'phones',
	'rtv',
	'agd',
	'accessories',
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

export const vatEnum = zod.enum(['23', '15', '10', '8', '5'])

export type VatEnum = zod.infer<typeof vatEnum>

export const productSchema = zod
	.object({
		name: zod
			.string({ message: 'Nazwa jest wymagana' })
			.min(3, { message: 'Nazwa musi mieć co najmniej 3 znaki' }),
		sku: zod
			.string({ message: 'SKU jest wymagane' })
			.regex(/^[a-zA-Z0-9]+$/, {
				message: 'SKU może zawierać tylko litery i cyfry',
			})
			.max(24, { message: 'SKU może mieć maksymalnie 24 znaki' }),
		description: zod.string().optional(),
		producer: zod.enum(producerEnum.options, {
			message: 'Producent jest wymagany',
		}),
		category: zod.enum(categoryEnum.options, {
			message: 'Kategoria jest wymagana',
		}),
		features: zod.array(featuresEnum),
		price: zod.number({ message: 'Cena netto jest wymagana' }).min(0),
		vat: zod.enum(vatEnum.options, {
			message: 'VAT jest wymagany',
		}),
		currency: zod.enum(currencyEnum.options, {
			message: 'Waluta jest wymagana',
		}),
		available: zod.boolean(),
		limited: zod.boolean(),
		stock: zod
			.number()
			.int({ message: 'Ilość musi być liczbą całkowitą' })
			.min(0, { message: 'Ilość nie może być ujemna' })
			.optional(),
		minInCart: zod
			.number()
			.int({ message: 'Min. ilość musi być liczbą całkowitą' })
			.min(0),
		maxInCart: zod
			.number()
			.int({ message: 'Maks. ilość musi być liczbą całkowitą' })
			.min(0),
	})
	.refine((data) => data.maxInCart >= data.minInCart, {
		message: 'Maks. ilość w koszyku nie może być mniejsza od min.',
		path: ['maxInCart'],
	})
	.refine((data) => (data.limited ? data.stock !== undefined : true), {
		message: 'Ilość na magazynie jest wymagana dla produktu limitowanego',
		path: ['stock'],
	})
	.refine((data) => (data.limited ? true : data.stock === undefined), {
		message: 'Nie wolno podać ilości na magazynie dla produktu nielimitowanego',
		path: ['stock'],
	})

export type Product = zod.infer<typeof productSchema>
