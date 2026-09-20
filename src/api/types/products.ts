import type { Pagination, PaginationResponse } from '@/types/pagination.ts'
import type { DbProduct } from '@/types/product.ts'

export type GetProductRequest = Pagination

export type GetProductResponse = PaginationResponse<DbProduct>
