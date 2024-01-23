import { useState } from 'react'
import { AppRouter } from './AppRouter'
import { SupplierProvider } from './context/SupplierProvider'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <SupplierProvider>
        <AppRouter />
      </SupplierProvider>
    </>
  )
}

export default App
