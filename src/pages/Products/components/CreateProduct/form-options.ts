import { formOptions } from '@tanstack/react-form'
import type { z } from 'zod'

import { productSchema } from '@/schemas/product'

export const productFormOpts = formOptions({
	defaultValues: {
		name: '',
		sku: '',
		features: [],
		available: false,
		limited: false,
	} as Partial<z.infer<typeof productSchema>>,
})
