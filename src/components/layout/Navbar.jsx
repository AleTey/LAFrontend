import { NavLink } from "react-router-dom"
import { useAuth } from "../../auth/hook/useAuth"
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext.Jsx";
import { hasAnyRole, hasAnyRoleV2 } from "../../auth/utils/hasAnyRole";

export const Navbar = () => {

  const { handlerLogout, login } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-default"></nav>
      <nav className="navbar navbar-default"></nav>
      <nav className="navbar navbar-default"></nav>
      <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
        <div className="container-md">
          <NavLink className="navbar-brand nav-link" to="/"><span className="h4">Loveafrica</span></NavLink>
          {/* <a className="navbar-brand" href="#"><span className="h4">Love Africa</span></a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>

              {
                hasAnyRole(login.user.authorities, ["ROLE_WORKSHOP"]) &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="lotes-taller">Cortes</NavLink>
                </li>
              }
              {
                hasAnyRoleV2(["READ_PRODUCT"]) &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">Productos</NavLink>
                </li>
              }

              {
                hasAnyRole(login.user.authorities, ["READ_MODEL"]) &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="/models">Modelos</NavLink>
                </li>
              }
              {
                hasAnyRole(login.user.authorities, ['READ_FABRIC']) &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="/fabric">Telas</NavLink>
                </li>
              }
              {
                hasAnyRole(login.user.authorities, ['ROLE_ADMIN', 'ROLE_MANAGER']) &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="/suppliers">Proveedores</NavLink>
                </li>
              }
              {
                hasAnyRole(login.user.authorities, ["READ_LOTE"]) &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="/production">Producción</NavLink>
                </li>
              }
              {
                hasAnyRoleV2(["ROLE_ADMIN"]) &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="orders">Pedidos</NavLink>
                </li>
              }

              {
                hasAnyRole(login.user.authorities, ["READ_INPUT"]) &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="inputs">Insumos</NavLink>
                </li>
              }


              <li className="nav-item dropdown d-inline-block position-absolute end-0" style={{ marginRight: '100px' }}>
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {login.user.sub}
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>

                  <li>
                    {/* <a className="dropdown-item" href="#">Cambiar contraseña</a> */}
                  <NavLink className="dropdown-item" to="change-password">
                Cambiar contraseña
                  </NavLink>
                  </li>

                  {
                    login && login.isAuth &&
                    <li><a className="dropdown-item" href="#" onClick={handlerLogout}>Log out</a></li>
                  }
                </ul>
              </li>
              {/* </div> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}