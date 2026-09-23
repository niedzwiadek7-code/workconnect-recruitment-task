import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const ProductCardSkeleton = () => {
	return (
		<Card className='gap-2 bg-white p-3'>
			<div className='flex items-center justify-center gap-2.5'>
				<div className='flex min-w-0 grow flex-col gap-1'>
					<Skeleton className='h-5 w-3/4' />
					<Skeleton className='h-4 w-1/2' />
				</div>
				<Skeleton className='h-6 w-16' />
			</div>

			<div className='rounded-lg bg-accent p-3'>
				<div className='flex items-center gap-1'>
					<div className='flex min-w-0 grow flex-col items-start justify-start gap-1'>
						<Skeleton className='h-3 w-12' />
						<Skeleton className='h-5 w-16' />
					</div>

					<div className='flex min-w-0 grow flex-col items-start justify-start gap-1'>
						<Skeleton className='h-3 w-16' />
						<Skeleton className='h-5 w-20' />
					</div>

					<div className='flex min-w-0 grow flex-col items-start justify-start gap-1'>
						<Skeleton className='h-3 w-12' />
						<Skeleton className='h-5 w-10' />
					</div>
				</div>
			</div>
		</Card>
	)
}

export default ProductCardSkeleton
