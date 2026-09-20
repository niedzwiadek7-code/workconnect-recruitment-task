import { useMemo } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryStates } from 'nuqs'

import { productsApi } from '@/api/products.ts'
import type { GetProductResponse } from '@/api/types/products.ts'
import ProductsCards from '@/pages/Products/components/ProductsCards.tsx'
import ProductsHeader from '@/pages/Products/components/ProductsHeader.tsx'
import ProductsTable from '@/pages/Products/components/ProductsTable.tsx'

const Products = () => {
	const [filters, setFilters] = useQueryStates(
		{
			page: parseAsInteger.withDefault(1),
			perPage: parseAsInteger.withDefault(5),
		},
		{
			history: 'push',
		}
	)

	const {
		data: productsResult = { data: [], total: 0 },
		isPending,
		isError,
		error,
	} = useQuery<GetProductResponse>({
		queryKey: ['products', filters],
		queryFn: () => productsApi.getProducts(filters),
		placeholderData: keepPreviousData,
	})

	const totalPages = useMemo(() => {
		return Math.ceil(productsResult.total / filters.perPage)
	}, [productsResult.total, filters.perPage])

	const emptyRowsCount = useMemo(() => {
		return Math.max(0, filters.perPage - productsResult.data.length)
	}, [productsResult.data.length, filters.perPage])

	const handlePageChange = async (newPage: number): Promise<void> => {
		await setFilters({ page: newPage })
	}

	return (
		<div className='m-0 flex w-full flex-col gap-6 p-0'>
			<ProductsHeader
				isPending={isPending}
				isError={isError}
				error={error}
				total={productsResult.total}
			/>

			<ProductsTable
				productsResult={productsResult}
				filters={filters}
				totalPages={totalPages}
				emptyRowsCount={emptyRowsCount}
				handlePageChange={handlePageChange}
			/>

			<ProductsCards
				productsResult={productsResult}
				filters={filters}
				totalPages={totalPages}
				handlePageChange={handlePageChange}
			/>
		</div>
	)
}

export default Products
