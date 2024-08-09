import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";

const changePasswordForm = {
  password: "",
  newPassword: "",
  confirmNewPassword: ""
}

export const ChangePasswordPage = () => {

  const [changePasswordRequest, setChangePasswordRequest] = useState(changePasswordForm);

  const { changePassword } = useContext(AuthContext);

  const handleFrom = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;

    setChangePasswordRequest({
      ...changePasswordRequest,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(changePasswordRequest);
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-header">
                <h3 className="text-center">Nueva contraseña</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Contraseña actual</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={changePasswordRequest.password}
                      onChange={handleFrom}
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Nueva contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      value={changePasswordRequest.newPassword}
                      onChange={handleFrom}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Confirmar contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={changePasswordRequest.confirmNewPassword}
                      onChange={handleFrom}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Confirmar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}