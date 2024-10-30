import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'
import './index.css'
import MapProvider from './components/google-maps/map-provider.jsx'
import { SnackbarProvider } from 'notistack'
import SidebarProvider from './shared/contexts/SidebarProvider.jsx'
import { Search } from 'lucide-react'
import SearchProvider from './shared/contexts/SearchProvider.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MapProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <QueryClientProvider client={queryClient}>
          <SearchProvider>
            <SidebarProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SidebarProvider>
          </SearchProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </MapProvider>
  </React.StrictMode>
)
