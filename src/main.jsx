import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SupplierProvider } from './context/SupplierProvider.jsx'
import { InputModalProvider } from './context/InputModalProvider.jsx'
import { InputsProvider } from './context/InputsProvider.jsx'
import { ElasticosProvider } from './context/ElasticosContext.jsx'
import { CorrederaProvider } from './context/CorrederaContext.jsx'
import { ArgollaProvider } from './context/ArgollaContext.jsx'
import { GanchosProvider } from './context/GanchosContext.jsx'
import { EtiquetaProvider } from './context/EtiquetaContext.jsx'
import { ApliquesProvider } from './context/ApliquesContext.jsx'
import { ModelProvider } from './context/ModelContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { LoteProvider } from './context/LoteContext.jsx'
import { OrderProvider } from './context/OrdersContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SupplierProvider>
        <InputModalProvider>
          <InputsProvider>
            <ElasticosProvider>
              <CorrederaProvider>
                <ArgollaProvider>
                  <GanchosProvider>
                    <EtiquetaProvider>
                      <ApliquesProvider>
                        <ModelProvider>
                          <ProductProvider>
                            <LoteProvider>
                              <OrderProvider>
                                <App />
                              </OrderProvider>
                            </LoteProvider>
                          </ProductProvider>
                        </ModelProvider>
                      </ApliquesProvider>
                    </EtiquetaProvider>
                  </GanchosProvider>
                </ArgollaProvider>
              </CorrederaProvider>
            </ElasticosProvider>
          </InputsProvider>
        </InputModalProvider>
      </SupplierProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
