import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { messageInfo } from "../../components/alerts/messageInfo";

// const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
//   isAuth: false,
//   user: {}
// }

const initialLogin = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const claims = JSON.parse(atob(token.split(".")[1]));
    return {
      isAuth: true,
      user: {
        ...claims,
        authorities: claims.authorities.split(",")
      }
    }
  }
  return {
    isAuth: false,
    user: {}
  }
}

export const useAuth = () => {

  const [login, dispatch] = useReducer(loginReducer, initialLogin());

  const navigate = useNavigate();


  const handlerLogin = async (loginFormData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginFormData)
      })
      if (res.ok) {
        const resJson = await res.json();
        const token = resJson.jwt;
        const claims = JSON.parse(atob(token.split(".")[1]));
        dispatch({
          type: 'LOGIN',
          payload: {
            ...claims,
            authorities: claims.authorities.split(",")
          }
        })
        sessionStorage.setItem('login', JSON.stringify({
          isAuth: true,
          user: resJson
        }));
        sessionStorage.setItem('token', `Bearer ${token}`)
      } else {
        console.log(res)
        let error = new Error(res.statusText);
        error.status = res.status;
        throw error;
      }
    } catch (error) {
      if (error.status === 401) {
        Swal.fire("Usuario o contraseña incorrecto");
      }

    };
  };

  const handlerLogout = () => {
    console.log("HANDLING LOGOUT")
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    dispatch({
      type: "LOGOUT"
    });
    navigate(`${import.meta.env.VITE_API_BASE_URL}/login`)
  };

  const changePassword = async (changePasswordRequest) => {

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/change-pass`, {
      method: "PUT",
      headers: {
        "Authorization": sessionStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changePasswordRequest)
    })
    if (res.ok) {
      const resJson = await res.text();
      handlerLogout();
    } else {
      const resJson = await res.text();
      console.log(resJson)

      messageInfo("d");
    }
  }

  return {
    login,
    handlerLogin,
    handlerLogout,
    changePassword
  };

}