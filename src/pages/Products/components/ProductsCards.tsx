import type { GetProductResponse } from '@/api/types/products'
import Pagination from '@/components/Pagination/Pagination'
import ProductCard from '@/pages/Products/components/ProductCard'

type Props = {
	productsResult: GetProductResponse
	filters: {
		page: number
		perPage: number
	}
	totalPages: number
	handlePageChange: (newPage: number) => Promise<void>
}

const ProductsCards = ({
	productsResult,
	filters,
	totalPages,
	handlePageChange,
}: Props) => {
	const handleMobilePageChange = async (newPage: number) => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})

		await handlePageChange(newPage)
	}

	return (
		<div className='flex h-full w-full flex-col gap-6 lg:hidden'>
			<div className='flex flex-col gap-2'>
				{productsResult.data.map((product) => (
					<ProductCard product={product} key={product.id} />
				))}
			</div>

			<div className='flex flex-col gap-4'>
				<div className='text-muted-xs text-center'>
					Strona {filters.page} z {totalPages} · {productsResult.total}{' '}
					produktów
				</div>

				<Pagination
					actualPage={filters.page}
					totalPages={totalPages}
					handleChangePage={handleMobilePageChange}
				/>
			</div>
		</div>
	)
}

export default ProductsCards
