import { NavLink } from "react-router-dom"
import { MenuIcon } from "./MenuIcon"

export const Menu = () => {



  return (
    <>

      <div className="container">
        <div className="row gap-4 m-4">
          <div className="col-12 d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
            <NavLink className="nav-link" to="/fabric">
              <MenuIcon
                img="src/assets/lycra-fabric.jpg"
                text="Telas"
              />
            </NavLink>

            <NavLink className="nav-link" to="/suppliers">
              <MenuIcon
                img="src/assets/supplier.png"
                text="Proveedores"
              />
            </NavLink>
          </div>
        </div>
        <div className="row gap-4 m-4">
          <div className="col-12 d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
            <NavLink className="nav-link" to="/products">
              <MenuIcon
                img="src/assets/bikini-tiras.jpg"
                text="Productos"
              />
            </NavLink>
            <NavLink className="nav-link" to="/inputs">
              <MenuIcon
                img="src/assets/accesorios-para-bikinis-o-lenceria.jpg"
                text="Insumos"
                color="black"
              />
            </NavLink>
          </div>
        </div>
        <div className="row gap-4 m-4">
          <div className="col-12 d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
            <NavLink className="nav-link" to="/models">
              <MenuIcon
                img="src/assets/moldes.png"
                text="Modelos"
              />
            </NavLink>
            <NavLink className="nav-link" to="/production">
              <MenuIcon
                img="src/assets/maquina.jpg"
                text="Producción"
                color="black"
              />
            </NavLink>
          </div>
        </div>

        <div className="row gap-4 m-4">
          <div className="col-12 d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
            <NavLink className="nav-link" to="/models">
              <MenuIcon
                img="src/assets/nuevaColeccion.jpg"
                text="Nueva Colección"
                color="indigo"
              />
            </NavLink>
            <NavLink className="nav-link" to="/production">
              <MenuIcon
                img="src/assets/maquina.jpg"
                text="Producción"
                color="black"
              />
            </NavLink>
          </div>
        </div>

      </div>













      {/* <div className="container d-flex flex-column gap-4">

        <div className="d-flex justify-content-center gap-4">

            <NavLink className="nav-link" to="/fabric">
              <MenuIcon
                img="src/assets/lycra-fabric.jpg"
                text="Telas"
              />
            </NavLink>

            <NavLink className="nav-link" to="/suppliers">
              <MenuIcon
                img="src/assets/supplier.png"
                text="Proveedores"
              />
            </NavLink>
        </div>
        <div className="container d-flex justify-content-center">
          <MenuIcon
            img="src/assets/bikini-tiras.jpg"
            text="Productos"
          />

        </div>

      </div> */}
    </>
  )
}