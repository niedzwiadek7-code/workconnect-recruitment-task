import type { Product } from '@/schemas/product'

export type DbProduct = Product & { id: number }
