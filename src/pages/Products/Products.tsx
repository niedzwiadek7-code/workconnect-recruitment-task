import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { productsApi } from '@/api/products'
import type { GetProductResponse } from '@/api/types/products'
import ProductsCards from '@/pages/Products/components/ProductsCards/ProductsCards'
import ProductsHeader from '@/pages/Products/components/ProductsHeader'
import ProductsTable from '@/pages/Products/components/ProductsTable/ProductsTable'
import { useProductsPagination } from '@/pages/Products/hooks/useProductsPagination'

const Products = () => {
	const [filters, setFilters] = useProductsPagination()

	const {
		data: productsResult = { data: [], total: 0 },
		isPending,
		isFetching,
		isError,
		error,
	} = useQuery<GetProductResponse>({
		queryKey: ['products', filters],
		queryFn: () => productsApi.getProducts(filters),
		staleTime: 60_000,
	})

	const totalPages = Math.ceil(productsResult.total / filters.perPage)
	const page = isPending ? filters.page : Math.min(filters.page, totalPages)

	useEffect(() => {
		if (filters.page !== page) {
			setFilters({ page })
		}
	}, [filters.page, page, setFilters])

	const pagination = useMemo(() => {
		return { ...filters, page }
	}, [filters, page])

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
				filters={pagination}
				totalPages={totalPages}
				emptyRowsCount={emptyRowsCount}
				handlePageChange={handlePageChange}
				isPending={isFetching}
			/>

			<ProductsCards
				productsResult={productsResult}
				filters={pagination}
				totalPages={totalPages}
				handlePageChange={handlePageChange}
				isPending={isFetching}
			/>
		</div>
	)
}

export default Products
