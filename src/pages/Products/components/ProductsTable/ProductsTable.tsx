import type { GetProductResponse } from '@/api/types/products'
import Pagination from '@/components/Pagination/Pagination'
import { Badge } from '@/components/ui/badge'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import AvailableBadge from '@/pages/Products/components/AvailableBadge'
import TableRowSkeleton from '@/pages/Products/components/ProductsTable/components/TableRowSkeleton'
import { categoryNameToCategoryLabel } from '@/pages/Products/utils/mapper'
import type { Pagination as PaginationType } from '@/types/pagination'
import { calculateGrossPrice, formatPrice } from '@/utils/price'

type Props = {
	productsResult: GetProductResponse
	filters: PaginationType
	totalPages: number
	emptyRowsCount: number
	handlePageChange: (newPage: number) => Promise<void>
	isPending: boolean
}

const ProductsTable = ({
	productsResult,
	filters,
	totalPages,
	emptyRowsCount,
	handlePageChange,
	isPending,
}: Props) => {
	return (
		<div className='hidden w-full rounded-lg border bg-card shadow-xs lg:block'>
			<Table>
				<colgroup>
					<col className='w-[28%]' />
					<col className='w-[14.4%]' />
					<col className='w-[14.4%]' />
					<col className='w-[14.4%]' />
					<col className='w-[14.4%]' />
					<col className='w-[14.4%]' />
				</colgroup>
				<TableHeader>
					<TableRow>
						<TableHead className='rounded-tl-lg bg-gray-50 text-muted-foreground'>
							Nazwa
						</TableHead>
						<TableHead className='bg-gray-50 text-muted-foreground'>
							SKU
						</TableHead>
						<TableHead className='bg-gray-50 text-muted-foreground'>
							Kategoria
						</TableHead>
						<TableHead className='bg-gray-50 text-muted-foreground'>
							Cena Brutto
						</TableHead>
						<TableHead className='bg-gray-50 text-muted-foreground'>
							Status
						</TableHead>
						<TableHead className='rounded-tr-lg bg-gray-50 text-muted-foreground'>
							Magazyn
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isPending
						? Array.from({ length: filters.perPage }).map((_, index) => (
								<TableRowSkeleton key={index} />
							))
						: productsResult.data.map((product) => (
								<TableRow key={product.id}>
									<TableCell className='px-4 py-2'>{product.name}</TableCell>
									<TableCell className='text-muted-xs px-4 py-2'>
										{product.sku}
									</TableCell>
									<TableCell className='text-muted-xs px-4 py-2'>
										{categoryNameToCategoryLabel[product.category]}
									</TableCell>
									<TableCell className='px-4 py-2'>
										{formatPrice(
											calculateGrossPrice(product.price, Number(product.vat)),
											product.currency
										)}
									</TableCell>
									<TableCell className='px-4 py-2'>
										<AvailableBadge available={product.available} />
									</TableCell>
									<TableCell className='px-4 py-2'>
										{product.limited ? product.stock : '-'}
									</TableCell>
								</TableRow>
							))}

					{!isPending &&
						Array.from({ length: emptyRowsCount }).map((_, index) => (
							<TableRow key={`empty-${index}`}>
								<TableCell className='px-4 py-2' colSpan={6}>
									<Badge variant='ghost'>&nbsp;</Badge>
								</TableCell>
							</TableRow>
						))}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TableCell colSpan={6} className='m-0 p-0'>
							<div className='flex items-center justify-center rounded-b-lg bg-gray-50 p-4'>
								<div className='text-muted-xs grow'>
									Strona {filters.page} z {totalPages} · {productsResult.total}{' '}
									produktów
								</div>

								<Pagination
									actualPage={filters.page}
									totalPages={totalPages}
									handleChangePage={handlePageChange}
								/>
							</div>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	)
}

export default ProductsTable
