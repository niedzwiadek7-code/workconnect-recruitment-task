import type { Product } from '@/schemas/product.ts'

export type DbProduct = Product & { id: number }
