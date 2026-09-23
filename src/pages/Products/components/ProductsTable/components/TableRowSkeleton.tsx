import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

const TableRowSkeleton = () => {
	return (
		<TableRow>
			{Array.from({ length: 6 }).map((__, cellIndex) => (
				<TableCell key={cellIndex} className='px-4 py-2'>
					<Skeleton className='h-5 w-full' />
				</TableCell>
			))}
		</TableRow>
	)
}

export default TableRowSkeleton
