import { useMemo } from 'react'

import {
	Pagination as PaginationPrimitive,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

type PaginationProps = {
	actualPage: number
	totalPages: number
	handleChangePage: (newPage: number) => void | Promise<void>
}

type PageItem = { type: 'page'; number: number } | { type: 'ellipsis' }

const getVisiblePages = (
	actualPage: number,
	totalPages: number
): PageItem[] => {
	if (totalPages <= 3) {
		return Array.from({ length: totalPages }, (_, i) => ({
			type: 'page' as const,
			number: i + 1,
		}))
	}

	if (totalPages === 4) {
		return [1, 2, 3, 4].map((n) => ({ type: 'page' as const, number: n }))
	}

	if (actualPage <= 2) {
		return [
			{ type: 'page' as const, number: 1 },
			{ type: 'page' as const, number: 2 },
			{ type: 'page' as const, number: 3 },
			{ type: 'ellipsis' as const },
			{ type: 'page' as const, number: totalPages },
		]
	}

	if (actualPage >= totalPages - 1) {
		return [
			{ type: 'page' as const, number: 1 },
			{ type: 'ellipsis' as const },
			{ type: 'page' as const, number: totalPages - 2 },
			{ type: 'page' as const, number: totalPages - 1 },
			{ type: 'page' as const, number: totalPages },
		]
	}

	const afterPage = actualPage + 1
	const needsEllipsis = afterPage < totalPages - 1

	const items: PageItem[] = [
		{ type: 'page' as const, number: actualPage - 1 },
		{ type: 'page' as const, number: actualPage },
		{ type: 'page' as const, number: afterPage },
	]

	if (needsEllipsis) {
		items.push({ type: 'ellipsis' as const })
	}

	items.push({ type: 'page' as const, number: totalPages })

	return items
}

const Pagination = ({
	actualPage,
	totalPages,
	handleChangePage,
}: PaginationProps) => {
	const isPreviousPageAvailable = actualPage > 1
	const isNextPageAvailable = actualPage < totalPages

	const handlePreviousPage = (): void => {
		if (isPreviousPageAvailable) {
			handleChangePage(actualPage - 1)
		}
	}

	const handleNextPage = (): void => {
		if (isNextPageAvailable) {
			handleChangePage(actualPage + 1)
		}
	}

	const handlePageClick = (newPage: number): void => {
		if (newPage > 0 && newPage <= totalPages) {
			handleChangePage(newPage)
		}
	}

	const visiblePages = useMemo(
		() => getVisiblePages(actualPage, totalPages),
		[actualPage, totalPages]
	)

	return (
		<PaginationPrimitive className='w-[unset]'>
			<PaginationContent>
				<PaginationItem className={isPreviousPageAvailable ? '' : 'opacity-50'}>
					<PaginationPrevious
						text='Wstecz'
						aria-disabled={!isPreviousPageAvailable}
						onClick={handlePreviousPage}
						className={
							!isPreviousPageAvailable
								? 'hover:text-muted-xs pointer-events-none text-sm hover:bg-transparent'
								: 'text-sm'
						}
					/>
				</PaginationItem>

				{visiblePages.map((item, index) =>
					item.type === 'ellipsis' ? (
						<PaginationItem key={`ellipsis-${index}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={item.number}>
							<PaginationLink
								className='rounded-md'
								isActive={actualPage === item.number}
								onClick={() => handlePageClick(item.number)}
							>
								{item.number}
							</PaginationLink>
						</PaginationItem>
					)
				)}

				<PaginationItem className={isNextPageAvailable ? '' : 'opacity-50'}>
					<PaginationNext
						text='Dalej'
						aria-disabled={!isNextPageAvailable}
						onClick={handleNextPage}
						className={
							!isNextPageAvailable
								? 'hover:text-muted-xs pointer-events-none text-sm hover:bg-transparent'
								: ''
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</PaginationPrimitive>
	)
}

export default Pagination
