import { mockProductsApi } from '@/api/mock/productsApi'
import type {
	GetProductRequest,
	GetProductResponse,
} from '@/api/types/products'
import type { Product } from '@/schemas/product'

export interface ProductsApi {
	getProducts(request: GetProductRequest): Promise<GetProductResponse>
	createProduct(product: Product): Promise<Product>
}

// TODO: here should be implement real API
export const productsApi: ProductsApi = mockProductsApi
