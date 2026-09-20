import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NuqsAdapter } from 'nuqs/adapters/react'

import App from './App.tsx'

import './index.css'
// TODO: to delete or implement dark mode
// import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/*<ThemeProvider>*/}
		<NuqsAdapter>
			<App />
		</NuqsAdapter>
		{/*</ThemeProvider>*/}
	</StrictMode>
)
