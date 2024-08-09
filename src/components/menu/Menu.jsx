import { NavLink } from "react-router-dom"
import { MenuIcon } from "./MenuIcon"
import { hasAnyRole } from "../../auth/utils/hasAnyRole"
import { useContext } from "react"
import { AuthContext } from "../../auth/context/AuthContext.Jsx"
import '../../acss/menu.css'

export const Menu = () => {

  const { login } = useContext(AuthContext);

  return (
    <>



      {/* 1 */}
      <div className="row d-flex justify-content-start gap-5 mt-4">
        {/* <div className="col-12 d-flex flex-column flex-md-row align-items-center justify-content-center gap-4"> */}
        {
          hasAnyRole(login.user.authorities, ["READ_FABRIC"]) &&
          <div className="col container-img" style={{ maxWidth: "200px" }}>
            <NavLink className="nav-link" to="/fabric">
              <MenuIcon
                img="src/assets/lycra-fabric.jpg"
                text="Telas"
                color="black"
              />
            </NavLink>
          </div>
        }


        {
          hasAnyRole(login.user.authorities, ["READ_INPUT"]) &&
          <div className="col" style={{ maxWidth: "200px" }}>
            <NavLink className="nav-link" to="/inputs">
              <MenuIcon
                img="src/assets/accesorios-para-bikinis-o-lenceria.jpg"
                text="Insumos"
                color="black"
              />
            </NavLink>
          </div>
        }


        {
          hasAnyRole(login.user.authorities, ['ROLE_ADMIN', 'ROLE_MANAGER']) &&
          <div className="col" style={{ maxWidth: "200px" }}>
            <NavLink className="nav-link" to="/suppliers">
              <MenuIcon
                img="src/assets/supplier.png"
                text="Proveedores"
                color="black"
              />
            </NavLink>
          </div>
        }

        {
          hasAnyRole(login.user.authorities, ["READ_MODEL"]) &&
          <div className="col" style={{ maxWidth: "200px" }}>
            <NavLink className="nav-link" to="/models">
              <MenuIcon
                img="src/assets/moldes.png"
                text="Modelos"
                color="black"
              />
            </NavLink>
          </div>
        }

        {
          hasAnyRole(login.user.authorities, ["READ_PRODUCT"]) &&
          <div className="col" style={{ maxWidth: "200px" }}>
            <NavLink className="nav-link" to="/products">
              <MenuIcon
                img="src/assets/products2.jpg"
                text="Productos"
                color="black"
              />
            </NavLink>
          </div>
        }

        {
          hasAnyRole(login.user.authorities, ["READ_LOTE"]) &&
          <div className="col" style={{ maxWidth: "200px" }}>
            <NavLink className="nav-link" to="/production">
              <MenuIcon
                img="src/assets/maquina.jpg"
                text="Producción"
                color="black"
              />
            </NavLink>
          </div>
        }

        {/* 3 */}

        {/* <div className="row d-flex justify-content-center gap-5 mt-5"> */}
        {
          hasAnyRole(login.user.authorities, ["READ_WAREHOUSE"]) &&
          <div className="col" style={{ maxWidth: "200px" }}>
            <NavLink className="nav-link" to="/warehouse">
              <MenuIcon
                img="src/assets/warehouse.jpeg"
                text="Deposito"
                color="black"
              />
            </NavLink>
          </div>
        }


        {
          hasAnyRole(login.user.authorities, ["READ_NEW_COLLECTION"]) &&
          <div className="col" style={{ maxWidth: "200px" }}>
            <NavLink className="nav-link" to="/new-collection">
              <MenuIcon
                img="src/assets/nuevaColeccion.jpg"
                text="Nueva Colección"
                color="black"
              />
            </NavLink>
          </div>
        }

        {/* <NavLink className="nav-link" to="/production">
              <MenuIcon
                img="src/assets/maquina.jpg"
                text="Producción"
                color="black"
              />
            </NavLink> */}
      </div>
      {/* </div > */}













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