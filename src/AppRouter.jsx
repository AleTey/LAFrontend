import { Navigate, Route, Routes } from "react-router-dom"
// import { Navbar } from "./components/layout/NavBar"
import { Fabric } from "./pages/Fabric"
import { Home } from "./pages/Home"
import { Suppliers } from "./pages/Suppliers"
import { Orders } from "./pages/Orders"
import { Products } from "./pages/Products"
import { Models } from "./pages/Models"
import { Production } from "./pages/Production"
import { Inputs } from "./pages/Inputs"
import { Navbar } from "./components/layout/Navbar"
import { Warehouse } from "./pages/Warehouse"
import { FabricSelector } from "./components/FabricSelector"
import { NewCollection } from "./pages/NewCollection"
import { LoginPage } from "./auth/pages/LoginPage"
import { useContext } from "react"
import { AuthContext } from "./auth/context/AuthContext.Jsx"
import { hasAnyRole } from "./auth/utils/hasAnyRole"
import { LotesWorkshopState } from "./pages/LotesWorkshopState"

export const AppRouter = () => {

  const { login } = useContext(AuthContext);


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Navigate to={"/"} />} />
        <Route path="/" element={<Home />} />

      
        
          <Route path="lotes-taller" element={<LotesWorkshopState />} />
      

        {
          hasAnyRole(login.user.authorities, ["READ_FABRIC"]) ?
            // <Route path="fabric" element={<Fabric />} />
            <Route path="fabric/page/:page" element={<Fabric />} />
            :
            <Route path="fabric" element={<Navigate to='/' />} />
        }
        {
          hasAnyRole(login.user.authorities, ["READ_FABRIC"]) ?
            <Route path="fabric" element={<Fabric />} />
            :
            <Route path="fabric" element={<Navigate to='/' />} />
        }
        {
          hasAnyRole(login.user.authorities, ['ROLE_ADMIN', 'ROLE_MANAGER'])
            ?
            <Route path="suppliers" element={<Suppliers />} />
            :
            <Route path="suppliers" element={<Navigate to='/' />} />
        }

        {
          hasAnyRole(login.user.authorities, ["READ_INPUT"]) ?
            <Route path="inputs" element={<Inputs />} />
            :
            <Route path="inputs" element={<Navigate to={"/"} />} />
        }
        {
          hasAnyRole(login.user.authorities, ["ROLE_ADMIN"]) ?
            <Route path="orders" element={<Orders />} />
            :
            <Route path="orders" element={<Navigate to='/' />} />
        }
        {
          hasAnyRole(login.user.authorities, ["READ_MODEL"]) &&
          <Route path="models" element={<Models />} />
        }
        {
          hasAnyRole(login.user.authorities, ["READ_PRODUCT"]) &&
          <Route path="products" element={<Products />} />
        }
        {
          hasAnyRole(login.user.authorities, ["READ_PRODUCT"]) &&
          <Route path="products/page/:page" element={<Products />} />
        }
        {
          hasAnyRole(login.user.authorities, ["READ_LOTE"]) &&
          <Route path="production" element={<Production />} />
        }
        {
          hasAnyRole(login.user.authorities, ["READ_WAREHOUSE"]) &&
          <Route path="warehouse" element={<Warehouse />} />
        }
        {
          hasAnyRole(login.user.authorities, ["READ_WAREHOUSE"]) &&
          <Route path="warehouse/page/:page" element={<Warehouse />} />
        }
        {
          hasAnyRole(login.user.authorities, ["READ_NEW_COLLECTION"]) &&
          <Route path="new-collection" element={<NewCollection />} />
        }

      </Routes>

    </>
  )
}