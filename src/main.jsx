import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SupplierProvider } from './context/SupplierProvider.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SupplierProvider>

        <App />
      </SupplierProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
