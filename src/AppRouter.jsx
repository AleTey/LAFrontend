import { Route, Routes } from "react-router-dom"
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

export const AppRouter = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="fabric" element={<Fabric />} />
        <Route path="fabric/page/:page" element={<Fabric />} />
        <Route path="suppliers" element={<Suppliers />} />

        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="products/page/:page" element={<Products />} />
        <Route path="models" element={<Models />} />
        <Route path="production" element={<Production />} />
        <Route path="inputs" element={<Inputs />} />
        <Route path="warehouse" element={<Warehouse />} />
        <Route path="warehouse/page/:page" element={<Warehouse />} />
        <Route path="warehouse/page/:page" element={<Warehouse />} />
        <Route path="new-collection" element={<NewCollection />} />

        {/* <Route path="fabric/fabric-selector/page/:page" element={<FabricSelector />} /> */}
      </Routes>

    </>
  )
}