import type { ReactNode } from 'react'

import { Toaster } from '@/components/ui/toast.tsx'

type Props = {
	children: ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<div className='flex min-h-svh px-4 py-6 lg:px-25 lg:py-12.5'>
			<div className='flex w-full text-sm leading-normal font-medium'>
				{children}
				<Toaster />
			</div>
		</div>
	)
}

export default Layout
