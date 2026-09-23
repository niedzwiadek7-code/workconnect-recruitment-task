import type { ProductsApi } from '@/api/products'
import type {
	GetProductRequest,
	GetProductResponse,
} from '@/api/types/products'
import { type Product, productSchema } from '@/schemas/product'
import { dumpProducts } from '@/test/data/products'
import type { DbProduct } from '@/types/product'
import { delay } from '@/utils'

const MOCK_DELAY_MS = 300

let products: DbProduct[] = [...dumpProducts]

export const mockProductsApi: ProductsApi = {
	getProducts: async (
		request: GetProductRequest
	): Promise<GetProductResponse> => {
		await delay(MOCK_DELAY_MS)
		const start = (request.page - 1) * request.perPage
		const end = start + request.perPage
		return {
			data: products.slice(start, end),
			total: products.length,
		}
	},

	createProduct: async (product: Product) => {
		await delay(MOCK_DELAY_MS)
		const validated = productSchema.parse(product)
		products = [
			{
				...validated,
				id: products.length + 1,
			},
			...products,
		]
		return validated
	},
}
