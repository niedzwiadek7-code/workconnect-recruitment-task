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

export const vatEnum = zod.enum(['23', '8', '5', '0'])

export type VatEnum = zod.infer<typeof vatEnum>

export const productSchema = zod
	.object({
		name: zod
			.string({ error: 'Nazwa jest wymagana' })
			.min(3, { error: 'Nazwa musi mieć co najmniej 3 znaki' }),
		sku: zod
			.string({ error: 'SKU jest wymagane' })
			.min(1, { error: 'SKU jest wymagane' })
			.regex(/^[a-zA-Z0-9]*$/, {
				error: 'SKU może zawierać tylko litery i cyfry',
			})
			.max(24, { error: 'SKU może mieć maksymalnie 24 znaki' }),
		description: zod.string().optional(),
		producer: zod.enum(producerEnum.options, {
			error: 'Producent jest wymagany',
		}),
		category: zod.enum(categoryEnum.options, {
			error: 'Kategoria jest wymagana',
		}),
		features: zod
			.array(featuresEnum)
			.min(1, { error: 'Co najmniej jedna cecha jest wymagana' }),
		price: zod.number({ error: 'Cena netto jest wymagana' }).min(0),
		vat: zod.enum(vatEnum.options, {
			error: 'VAT jest wymagany',
		}),
		currency: zod.enum(currencyEnum.options, {
			error: 'Waluta jest wymagana',
		}),
		available: zod.boolean({ error: 'Dostępność jest wymagana' }),
		limited: zod.boolean({ error: 'Limit jest wymagany' }),
		stock: zod
			.number()
			.int({ error: 'Ilość musi być liczbą całkowitą' })
			.min(0, { error: 'Ilość nie może być ujemna' })
			.optional(),
		minInCart: zod
			.number({ error: 'Min. ilość jest wymagana' })
			.int({ error: 'Min. ilość musi być liczbą całkowitą' })
			.min(0),
		maxInCart: zod
			.number({ error: 'Maks. ilość jest wymagana' })
			.int({ error: 'Maks. ilość musi być liczbą całkowitą' })
			.min(0),
	})
	.refine((data) => data.maxInCart >= data.minInCart, {
		error: 'Maks. ilość w koszyku nie może być mniejsza od min.',
		path: ['maxInCart'],
	})
	.refine((data) => (data.limited ? data.stock !== undefined : true), {
		error: 'Ilość na magazynie jest wymagana dla produktu limitowanego',
		path: ['stock'],
	})
	.refine((data) => (data.limited ? true : data.stock === undefined), {
		error: 'Nie wolno podać ilości na magazynie dla produktu nielimitowanego',
		path: ['stock'],
	})

export type Product = zod.infer<typeof productSchema>
