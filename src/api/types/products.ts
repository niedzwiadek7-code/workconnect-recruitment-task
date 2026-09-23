import type { Pagination, PaginationResponse } from '@/types/pagination'
import type { DbProduct } from '@/types/product'

export type GetProductRequest = Pagination

export type GetProductResponse = PaginationResponse<DbProduct>
