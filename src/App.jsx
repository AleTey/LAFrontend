import { useContext, useEffect, useState } from 'react'
import { AppRouter } from './AppRouter'
import { SupplierProvider } from './context/SupplierProvider'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './auth/pages/LoginPage'
import { AuthContext } from './auth/context/AuthContext.Jsx'
import { useTokenExpiration } from './auth/hook/useTokenExpiration'
import { hasAnyRoleV2 } from './auth/utils/hasAnyRole'
import { LotesWorkshopState } from './pages/LotesWorkshopState'

function App() {
  const [count, setCount] = useState(0)

  const { login } = useContext(AuthContext);

  return (
    <>
      <Routes >
        {
          login.isAuth ?
              <Route path='/*' element={<AppRouter />} />

            :
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to='/login' />} />
            </>
        }
      </Routes >
    </>
  )
}

export default App
