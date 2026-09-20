import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'

type Props = {
	isPending?: boolean
	isError?: boolean
	error?: Error | null
	total: number
}

const ProductsHeader = ({ isPending, isError, error, total }: Props) => {
	return (
		<div className='flex w-full justify-between'>
			<div className='flex flex-col gap-1'>
				<h1 className='text-xl font-semibold text-foreground'>Produkty</h1>
				<div className='text-muted-xs'>
					{isPending && 'Ładowanie…'}
					{isError && `Błąd ładowania: ${error?.message ?? 'nieznany błąd'}`}
					{!isPending && !isError && `${total} produktów w katalogu`}
				</div>
			</div>
			<Button variant='default' className='cursor-pointer px-4 py-2'>
				<Plus />
				Dodaj produkt
			</Button>
		</div>
	)
}

export default ProductsHeader
