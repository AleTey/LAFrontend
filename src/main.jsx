import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SupplierProvider } from './context/SupplierProvider.jsx'
import { InputModalProvider } from './context/InputModalProvider.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SupplierProvider>
        <InputModalProvider>
          <App />
        </InputModalProvider>
      </SupplierProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
