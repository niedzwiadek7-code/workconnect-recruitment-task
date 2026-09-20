import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Layout from '@/components/Layout/Layout.tsx'
import ProductsTable from '@/pages/Products/Products.tsx'

const queryClient = new QueryClient()

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Layout>
				<ProductsTable />
			</Layout>
		</QueryClientProvider>
	)
}

export default App
