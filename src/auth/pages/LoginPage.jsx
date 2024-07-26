import { useContext, useEffect, useReducer, useState } from "react";
import { loginReducer } from "../reducers/loginReducer";
import { useAuth } from "../hook/useAuth";
import { AuthContext } from "../context/AuthContext.Jsx";

const initialLoginForm = {
  username: "",
  password: ""
}
export const LoginPage = () => {

  const [loginForm, setLoginForm] = useState(initialLoginForm);


  const { handlerLogin } = useContext(AuthContext);


  const onChangeLoginForm = (e) => {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión aquí

    handlerLogin(loginForm);
    console.log('Username:', loginForm.username);
    console.log('Password:', loginForm.password);
  };



  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-header">
                <h3 className="text-center">Iniciar sesión</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="user">Usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      id="user"
                      name="username"
                      value={loginForm.username}
                      onChange={onChangeLoginForm}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={loginForm.password}
                      onChange={onChangeLoginForm}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Iniciar sesión
                  </button>
                </form>
              </div>
              {/* <div className="card-footer text-center">
                <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>


    </>
  )
}