import { mockProductsApi } from '@/api/mock/productsApi.ts'
import type {
	GetProductRequest,
	GetProductResponse,
} from '@/api/types/products.ts'
import type { Product } from '@/schemas/product.ts'

export interface ProductsApi {
	getProducts(request: GetProductRequest): Promise<GetProductResponse>
	createProduct(product: Product): Promise<Product>
}

// TODO: here should be implement real API
export const productsApi: ProductsApi = mockProductsApi
