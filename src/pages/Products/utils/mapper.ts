import type { Product } from '@/schemas/product'

export const categoryNameToCategoryLabel: Record<Product['category'], string> =
	{
		computers: 'Komputery',
		phones: 'Telefony',
		rtv: 'RTV',
		agd: 'AGD',
		accessories: 'Akcesoria',
	}
