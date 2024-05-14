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
        <Route path="models" element={<Models />} />
        <Route path="production" element={<Production />} />
        <Route path="inputs" element={<Inputs />} />
      </Routes>

    </>
  )
}