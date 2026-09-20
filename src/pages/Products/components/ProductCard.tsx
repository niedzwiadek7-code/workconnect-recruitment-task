import { Card } from '@/components/ui/card.tsx'
import AvailableBadge from '@/pages/Products/components/AvailableBadge.tsx'
import type { Product } from '@/schemas/product.ts'
import { calculateGrossPrice, formatPrice } from '@/utils/price.ts'

type Props = {
	product: Product
}

const ProductCard = ({ product }: Props) => {
	return (
		<Card className='gap-2 bg-white p-3'>
			<div className='flex items-center justify-center gap-2.5'>
				<div className='flex min-w-0 grow flex-col gap-1'>
					<div className='truncate text-base font-medium'>{product.name}</div>
					<div className='text-muted-xs truncate'>{product.sku}</div>
				</div>

				<AvailableBadge available={product.available} />
			</div>

			<div className='rounded-lg bg-accent p-3'>
				<div className='flex items-center gap-1'>
					<div className='flex min-w-0 grow flex-col items-start justify-start gap-1'>
						<div className='text-muted-xs truncate'>Kategoria</div>
						<div className='truncate'>{product.category}</div>
					</div>

					<div className='flex min-w-0 grow flex-col items-start justify-start gap-1'>
						<div className='text-muted-xs truncate'>Cena brutto</div>
						<div className='truncate'>
							{formatPrice(
								calculateGrossPrice(product.price, product.vat),
								product.currency
							)}
						</div>
					</div>

					<div className='flex min-w-0 grow flex-col items-start justify-start gap-1'>
						<div className='text-muted-xs truncate'>Magazyn</div>
						<div className='truncate'> - </div>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default ProductCard
