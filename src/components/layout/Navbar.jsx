import { NavLink } from "react-router-dom"

export const Navbar = () => {

  return (
    <>
    <nav className="navbar navbar-default"></nav>
    <nav className="navbar navbar-default"></nav>
    <nav className="navbar navbar-default"></nav>
      <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
        <div className="container-md">
          <NavLink className="navbar-brand nav-link" to="/"><span className="h4">Love Africa</span></NavLink>
          {/* <a className="navbar-brand" href="#"><span className="h4">Love Africa</span></a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
                {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/models">Modelos</NavLink>
                {/* <a className="nav-link" href="#">Pedidos</a> */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/fabric">Telas</NavLink>
                {/* <a className="nav-link" href="#">Insumos</a> */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/suppliers">Proveedores</NavLink>
                {/* <a className="nav-link" href="#">Proveedores</a> */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/production">Producción</NavLink>
                {/* <a className="nav-link" href="#">Proveedores</a> */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="orders">Pedidos</NavLink>
                {/* <a className="nav-link" href="#">Pedidos</a> */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="inputs">Insumos</NavLink>
                {/* <a className="nav-link" href="#">Pedidos</a> */}
              </li>

              {/* <div className="container d-flex flex-row-reverse ml-10"> */}

              <li className="nav-item dropdown d-inline-block position-absolute end-0" style={{ marginRight: '100px' }}>
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cuenta
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
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