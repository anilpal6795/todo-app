import { Box, Theme } from '@radix-ui/themes'
import { Routes } from './Routes'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <main>
          <Box px="5" py="6" style={{ maxWidth: '900px' }} mx="auto">
            <Routes />
          </Box>
        </main>
      </Theme>
    </QueryClientProvider>
  )
}

export default App
